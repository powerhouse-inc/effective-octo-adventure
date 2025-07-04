# Generic Database System

This directory contains a generic database system that automatically adapts to your migration files, eliminating the need to manually update database types when adding new migrations.

## How It Works

The system consists of three main components:

1. **`db.ts`** - Main database utilities with generic types
2. **`schema-generator.ts`** - Analyzes migration files and generates TypeScript types
3. **`scripts/generate-db-types.ts`** - Script to generate database types from migrations

## Features

### ✅ Automatic Migration Loading

- Dynamically loads and runs all migration files from the `migrations/` directory
- Migrations are executed in alphabetical order
- No need to manually import or register new migrations

### ✅ Generic Type System

- Uses a generic `Database` interface that works with any schema
- Provides type safety while remaining flexible
- Falls back gracefully if generated types are not available

### ✅ Type Generation (Optional)

- Can generate specific TypeScript types from your migration files
- Provides better IntelliSense and type checking
- Generated types are automatically used when available

## Usage

### Basic Usage (Recommended)

```typescript
import { getDb } from "./utils/db.js";

// This will automatically run all migrations and return a typed database
const db = await getDb(databaseConnection);

// Use the database with generic types
const users = await db.selectFrom("users").selectAll().execute();
```

### Without Migrations

```typescript
import { getDbWithoutMigrations } from "./utils/db.js";

// Use when migrations are handled elsewhere
const db = getDbWithoutMigrations(databaseConnection);
```

### Extended Schema (Search Indexer)

```typescript
import { getExtendedDb } from "./utils/db.js";

// Use the extended schema with additional fields
const db = getExtendedDb(databaseConnection);
```

## Adding New Migrations

1. Create a new migration file in the `migrations/` directory
2. Follow the naming convention: `YYYYMMDD-description.ts`
3. Export an `up` function that takes a `Kysely<any>` parameter
4. The migration will be automatically discovered and run

Example migration:

```typescript
import { sql, type Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("users")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("name", "varchar(255)", (col) => col.notNull())
    .addColumn("email", "varchar(255)", (col) => col.notNull())
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("users").execute();
}
```

## Generating Types (Optional)

If you want better type safety and IntelliSense, you can generate specific types from your migrations:

```bash
# Run the type generation script
npx tsx scripts/generate-db-types.ts
```

This will create `utils/generated/database-types.ts` with specific types based on your migration files.

## Benefits

### For Developers

- **No manual schema updates**: Add migrations without touching `db.ts`
- **Type safety**: Get compile-time errors for invalid table/column references
- **Better IntelliSense**: Autocomplete for table and column names
- **Flexibility**: Works with any database schema

### For Teams

- **Reduced maintenance**: Less code to maintain and update
- **Consistency**: All developers use the same database interface
- **Safety**: Prevents runtime errors from schema mismatches

## Migration File Requirements

Your migration files must:

1. Export an `up` function with signature: `(db: Kysely<any>) => Promise<void>`
2. Use Kysely's schema builder for table creation
3. Follow the naming convention for automatic discovery

## Troubleshooting

### Migrations Not Running

- Check that migration files end with `.ts` or `.js`
- Ensure the `up` function is properly exported
- Verify file naming follows the convention

### Type Generation Issues

- Make sure migration files use standard Kysely patterns
- Check that the `generated/` directory is writable
- Review the generated types file for accuracy

### Generic Types Too Broad

- Run the type generation script for more specific types
- The generic interface will still work, but with less type safety

## Advanced Usage

### Custom Type Inference

```typescript
import { createDatabaseWithInferredTypes } from "./utils/db.js";

const { db, type } = await createDatabaseWithInferredTypes(databaseConnection);
// `type` contains the inferred database schema type
```

### Migration Order Control

Migration files are executed in alphabetical order. Use numeric prefixes to control execution order:

```
migrations/
  001-initial-schema.ts
  002-add-users-table.ts
  003-add-indexes.ts
```

## Contributing

When adding new features to the database system:

1. Update the generic interface in `db.ts` if needed
2. Enhance the schema generator in `schema-generator.ts` for better type inference
3. Update this README with new features and usage examples
4. Add tests for new functionality
