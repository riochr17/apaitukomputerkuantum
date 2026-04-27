import express from "express";
import fs from "fs/promises";
import path from "path";

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";

const app = express();
const PORT = 3000;

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings, {
    behavior: "append",
    properties: {
      className: ["anchor"],
    },
    content: {
      type: "text",
      value: "",
    },
  })
  .use(rehypeHighlight)
  .use(rehypeStringify);

app.use('/p', express.static('public'));
app.get("/", async (req, res) => {
  try {
    const filePath = path.join(process.cwd(), './KOMPUTER-KUANTUM.md');
    const markdown = await fs.readFile(filePath, "utf-8");
    const html = String(await processor.process(markdown));
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Apa itu Komputer Kuantum? Penjelasan Lengkap dan Mudah Dipahami</title>
          <meta name="description" content="Komputer kuantum adalah jenis komputer yang menggunakan prinsip mekanika kuantum untuk memproses informasi lebih cepat dari komputer klasik. Pelajari konsep dasar, cara kerja, dan kegunaannya." />
          <link rel="canonical" href="https://apaitukomputerkuantum.web.id" />
          <meta property="og:title" content="Apa itu Komputer Kuantum?" />
          <meta property="og:description" content="Penjelasan lengkap komputer kuantum, cara kerja qubit, superposisi, dan manfaatnya dalam dunia teknologi modern." />
          <meta property="og:type" content="article" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css"/>
          <style>
            body {
              font-family: system-ui, sans-serif;
              max-width: 800px;
              margin: 40px auto;
              line-height: 1.6;
              padding: 0 16px;
            }
            pre {
              background: #EEE;
              padding: 16px;
              overflow-x: auto;
              border-radius: 8px;
              margin: 1.5em 0;
            }

            pre code {
              background: none; /* penting: jangan double background */
              padding: 0;
              font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
              font-size: 14px;
              line-height: 1.6;
              display: block;
            }

            /* inline code */
            code:not(pre code) {
              background: #EEE;
              padding: 2px 6px;
              border-radius: 4px;
              font-size: 0.9em;
            }
            .anchor {
              text-decoration: none;
              margin-left: 8px;
              font-size: 0.8em;
            }
            img {
              width: 100%;
              max-width: 550px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 24px 0;
              font-size: 14px;
            }

            thead {
              background: #EAEAEA;
            }

            th, td {
              border: 1px solid #DADADA;
              padding: 10px 12px;
              text-align: left;
            }

            th {
              font-weight: 600;
            }

            tr:nth-child(even) {
              background: #FAFAFA;
            }
            blockquote {
              margin: 1.5em 0;
              padding: 0.75em 1em;
              border-left: 4px solid #d0d7de;
              background: #f6f8fa;
              color: #57606a;
            }

            blockquote p {
              margin: 0;
            }
          </style>
        </head>
        <body>
          <!-- Google tag (gtag.js) -->
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-HFVTJYZMHE"></script>
          <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-HFVTJYZMHE');
          </script>
          ${html}
        </body>
      </html>
    `);
  } catch (err) {
    res.status(404).send("File not found");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
