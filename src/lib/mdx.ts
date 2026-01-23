import fs from "fs";
import path from "path";
import matter from "gray-matter";

type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  author?: string;
  tags?: string[];
};

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  return matter(rawContent);
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { data, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata: data as Metadata,
      slug,
      content,
    };
  });
}

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), "src/content/blogs"));
}

export function getBlogPost(slug: string) {
  const filePath = path.join(process.cwd(), "src/content/blogs", `${slug}.mdx`);
  const { data, content } = readMDXFile(filePath);
  return {
    metadata: data as Metadata,
    content,
  };
}
