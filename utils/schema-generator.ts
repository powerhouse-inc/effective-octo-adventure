import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Type definitions for migration analysis
interface ColumnDefinition {
  name: string;
  type: string;
  nullable: boolean;
  primaryKey: boolean;
  references?: {
    table: string;
    column: string;
  };
}

interface TableDefinition {
  name: string;
  columns: ColumnDefinition[];
}

interface MigrationAnalysis {
  tables: TableDefinition[];
}

/**
 * Analyzes a migration file to extract table and column information
 * This parser handles Kysely's chained method syntax properly
 */
function analyzeMigrationFile(content: string): TableDefinition[] {
  const tables: TableDefinition[] = [];

  // More robust regex to find createTable blocks
  const createTableRegex =
    /\.createTable\(["']([^"']+)["']\)([\s\S]*?)\.execute\(\)/g;

  let match;

  while ((match = createTableRegex.exec(content)) !== null) {
    const tableName = match[1];
    const tableBlock = match[2];

    const table: TableDefinition = {
      name: tableName,
      columns: [],
    };

    // Parse each addColumn call within this table block
    const addColumnRegex =
      /\.addColumn\(["']([^"']+)["'],\s*["']([^"']+)["']([\s\S]*?)(?=\.addColumn|\.execute|$)/g;

    let columnMatch;
    while ((columnMatch = addColumnRegex.exec(tableBlock)) !== null) {
      const columnName = columnMatch[1];
      const columnType = columnMatch[2];
      const columnConfig = columnMatch[3];

      const column: ColumnDefinition = {
        name: columnName,
        type: columnType,
        nullable: true, // default to nullable
        primaryKey: false,
      };

      // Check for .notNull()
      if (/\.notNull\(\)/.test(columnConfig)) {
        column.nullable = false;
      }

      // Check for .primaryKey()
      if (/\.primaryKey\(\)/.test(columnConfig)) {
        column.primaryKey = true;
      }

      // Check for foreign key references
      const refMatch = /\.references\(["']([^"']+)\.([^"']+)["']\)/.exec(
        columnConfig,
      );
      if (refMatch) {
        column.references = {
          table: refMatch[1],
          column: refMatch[2],
        };
      }

      table.columns.push(column);
    }

    tables.push(table);
  }

  return tables;
}

/**
 * Converts Kysely column types to TypeScript types
 */
function kyselyTypeToTypeScript(kyselyType: string, nullable: boolean): string {
  let tsType = "any";

  // Handle type with size specifications like varchar(255)
  const baseType = kyselyType.split("(")[0].toLowerCase();

  switch (baseType) {
    case "serial":
    case "integer":
    case "bigint":
      tsType = "number";
      break;
    case "varchar":
    case "text":
    case "char":
      tsType = "string";
      break;
    case "boolean":
      tsType = "boolean";
      break;
    case "timestamp":
    case "date":
      tsType = "Date";
      break;
    case "json":
    case "jsonb":
      tsType = "string"; // JSON stored as string
      break;
    case "decimal":
    case "numeric":
    case "real":
    case "double":
      tsType = "number";
      break;
    default:
      tsType = "any";
  }

  return nullable ? `${tsType} | null` : tsType;
}

/**
 * Generates TypeScript interface from table definitions
 */
function generateTypeScriptInterface(tables: TableDefinition[]): string {
  let interfaceCode = "export interface Database {\n";

  for (const table of tables) {
    interfaceCode += `  ${table.name}: {\n`;

    for (const column of table.columns) {
      const tsType = kyselyTypeToTypeScript(column.type, column.nullable);
      interfaceCode += `    ${column.name}: ${tsType};\n`;
    }

    interfaceCode += "  };\n";
  }

  interfaceCode += "}\n";
  return interfaceCode;
}

/**
 * Analyzes all migration files and generates TypeScript types
 */
export async function generateDatabaseTypes(): Promise<string> {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const migrationsDir = path.join(__dirname, "../migrations");

  const allTables = new Map<string, TableDefinition>();

  try {
    const migrationFiles = fs
      .readdirSync(migrationsDir)
      .filter((file) => file.endsWith(".ts") || file.endsWith(".js"))
      .sort();

    for (const file of migrationFiles) {
      const migrationPath = path.join(migrationsDir, file);
      const content = fs.readFileSync(migrationPath, "utf-8");
      const tables = analyzeMigrationFile(content);

      // Merge tables, with later migrations taking precedence
      for (const table of tables) {
        allTables.set(table.name, table);
      }
    }

    return generateTypeScriptInterface(Array.from(allTables.values()));
  } catch (error) {
    console.error("Error generating database types:", error);
    throw error;
  }
}

/**
 * Writes generated types to a file
 */
export async function writeDatabaseTypes(outputPath: string): Promise<void> {
  const types = await generateDatabaseTypes();
  fs.writeFileSync(outputPath, types, "utf-8");
  console.log(`Database types written to: ${outputPath}`);
}
