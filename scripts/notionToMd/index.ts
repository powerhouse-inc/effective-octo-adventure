import { NotionConverter } from 'notion-to-md';
import { DefaultExporter } from 'notion-to-md/plugins/exporter';
import test from './test.json' with { type: 'json' };

// Initialize the Notion client with your integration token
// const notion = new Client({
//   auth: 'your-notion-integration-token',
// });

function convertRichTextToMarkdown(richTextArray: any[]): string {
  let markdown = '';
  
  for (const item of richTextArray) {
    let text = item.plain_text;
    
    // Apply annotations
    if (item.annotations) {
      if (item.annotations.bold) {
        text = `**${text}**`;
      }
      if (item.annotations.italic) {
        text = `*${text}*`;
      }
      if (item.annotations.strikethrough) {
        text = `~~${text}~~`;
      }
      if (item.annotations.code) {
        text = `\`${text}\``;
      }
      if (item.annotations.underline) {
        text = `<u>${text}</u>`;
      }
    }
    
    // Handle links
    if (item.href) {
      text = `${text}`;
    }
    
    // Handle mentions
    if (item.type === 'mention' && item.mention) {
      if (item.mention.type === 'page') {
        text = `[${text}](${item.href})`;
      }
    }
    
    markdown += text;
  }
  
  return markdown;
}

async function convertBlock() {
  try {
    // Create a NotionConverter instance with a dummy client
    const n2m = new NotionConverter({} as any);
    
    // Create a custom exporter that will handle our block
    const exporter = new DefaultExporter({
      outputType: 'file',
      outputPath: `markdown.md`
    });
    
    // Configure the converter with our exporter
    n2m.withExporter(exporter);
    
    let markdown = '';
    
    // Convert Additional Guidance block
    const guidanceBlock = test["Additional Guidance"];
    markdown += convertRichTextToMarkdown(guidanceBlock.rich_text);
    markdown += '\n\n'; // Add spacing between sections
    
    // Convert Content block
    const contentBlock = test["Content"];
    const contentText = convertRichTextToMarkdown(contentBlock.rich_text);
    
    // Split the content by newlines and format bullet points
    const lines = contentText.split('\n');
    for (const line of lines) {
      if (line.trim().startsWith('•')) {
        // Convert bullet point to markdown list item
        markdown += line.replace('•', '-') + '\n';
      } else {
        markdown += line + '\n';
      }
    }
    
    // console.log('Converted markdown:');
    // console.log(markdown);
    
    // Save to file
    await exporter.export({
      pageId: 'custom-block',
      blockTree: {} as any,
      content: markdown,
      manifests: {}
    } as any);
    
    console.log('✓ Successfully saved markdown to file!');
  } catch (error) {
    console.error('Conversion failed:', error);
  }
}

convertBlock();