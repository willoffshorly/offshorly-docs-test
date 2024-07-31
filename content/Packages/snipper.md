# Offshorly Codebase KB

This is just a test file to see if the offshorly docs are working correctly.

## Installation and Setup

1. Install the package:

    ```bash
    npm i offshorly-codebase-kb
    ```

2. Create extractor.js in your root directory add this code to it:

    ```javascript
   import { main_extractor } from 'offshorly-codebase-kb/src/extract_snippet.js';
   main_extractor();
    ```

3. Setup Husky:

    ```bash
   npm install --save-dev husky
   npx husky init
    ```

4. Add to package.json scripts section if not present:

    ```json
   "prepare": "husky"
    ```

5. Modify .husky/pre-commit:

    ```bash
   #!/bin/bash
   if ! node extractor.js; then  
       echo "Snippet extraction failed. Commit aborted."
       exit 1
   fi
   exit 0
    ```

## Usage

Use these tags in code comments:

```text
<snippet> and </snippet>: Enclose the entire snippet
<title> and </title>: One-line title
<descr> and </descr>: One-line description
```

Example in python:

```python
#<snippet>
#<title>My First Snippet</title>
#<descr>This is my first snippet using codebase-kb</descr>
def helloSnippet():
    print("Hello World! This is a code snippet")
#</snippet>
```

After commit, a hash is generated:

```python
#<snippet>a17a246c1d39b345cd6e0a6e54192aa8
#<title>My First Snippet</title>
#<descr>This is my first snippet using codebase-kb</descr>
def helloSnippet():
    print("Hello World! This is a code snippet")
#</snippet>
```

If modified and committed again, a new hash is generated:

```python
#<snippet>cd26bb4950bd8f69feee8000a86fd2da
#<title>My First Snippet</title>
#<descr>This is my first snippet using codebase-kb</descr>
def helloSnippet():
    print("Changing this snippet")
#</snippet>
```

## Important

- Use tags in comments
- One-line title and description
- No nested tags
- Close all tags
- Choose meaningful, reusable code
- Don't manually modify the hash
