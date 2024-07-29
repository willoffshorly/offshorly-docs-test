import fs from 'fs/promises';
import getMdPaths from './getMdPaths.js'
import { exec } from 'child_process';

async function getAuthor(filePath : any) {
    return new Promise((resolve, reject) => {
        exec(`git log -1 --pretty=format:%ae -- ${filePath}`, (error, stdout, stderr) => {
            if (error) {
                reject(stderr);
            } else {
                resolve(stdout.trim());
            }
        });
    });
}

async function extractMdContent(filePath : any) {
    const content = await fs.readFile(filePath, 'utf-8');
    const lines = content.split('\n');
    
    let title = '';
    let description = '';
    let isReadingDescription = false;
    let emptyLineCount = 0;

    console.log("--- Start of file processing ---");
    console.log("Total lines:", lines.length);

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmedLine = line.trim();
        
        console.log(`Line ${i + 1}:`, JSON.stringify(trimmedLine));

        if (!title && trimmedLine.startsWith('#')) {
            // Found the title
            title = trimmedLine.replace(/^#+\s*/, '').trim();
            console.log("Title found:", title);
            isReadingDescription = true;
            continue;
        }

        if (isReadingDescription) {
            if (trimmedLine === '') {
                emptyLineCount++;
                if (emptyLineCount > 1 || description !== '') {
                    console.log("Second empty line or end of description found");
                    break;
                }
            } else {
                emptyLineCount = 0;
                if (trimmedLine.startsWith('#')) {
                    console.log("New heading found, ending description capture");
                    break;
                }
                description += (description ? ' ' : '') + trimmedLine;
                console.log("Current description:", description);
            }
        }
    }

    console.log("--- End of file processing ---");
    console.log("Final title:", title);
    console.log("Final description:", description);

    const author = await getAuthor(filePath);

    return {
        title: title || "No title found",
        description: description || "No description found",
        author: author || "No author found"
    };
}


async function processMarkdownFiles(directory:any) {
  const mdFiles = await getMdPaths(directory,[]);
  const filesData = [];

  for (const filePath of mdFiles) {
    const { title, description, author } = await extractMdContent(filePath);
    // Replace backslashes with forward slashes
    const normalizedPath = filePath.replace(/\\/g, '/');
    filesData.push({
      title: title,
      desc: description,
      path: normalizedPath,
      author: author,
      source: "INTERNAL" // You can modify this as needed
    });
  }

  return filesData;
}

async function main() {
  const directory = "content"; // Replace with your directory path
  
  try {
    const filesData = await processMarkdownFiles(directory);
    const output = { files: filesData };
    
    const response = await fetch('http://localhost:3000/api/code_snippet', {   // https://kb-backend-ompt.onrender.com/api/code_snippet render
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(output)
    });

    if (!response.ok) {
      throw new Error(`Failed to send data: ${response.statusText}`);
    }

    console.log('Data sent successfully.');
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
