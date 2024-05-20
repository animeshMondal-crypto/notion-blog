import { Client } from "@notionhq/client";
import dayjs from "dayjs";
import { NotionToMarkdown } from "notion-to-md";

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

export async function getSingleBlog(slug: any) {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: "slug",
      formula: {
        string: {
          equals: slug,
        },
      },
    },
  });

  const page = response.results[0];
  const metadata = getPageMetaData(page);
  const mdblocks = await n2m.pageToMarkdown(page.id);
  const mdString = n2m.toMarkdownString(mdblocks);

  return {
    metadata,
    markdown: mdString,
  };
}

export async function getAllBlogs() {
  const res = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: "status",
      status: {
        equals: "Published",
      },
    },
    sorts: [
      {
        property: "created_at",
        direction: "descending",
      },
    ],
  });

  const allBlogs = res.results.map((blog) => {
    return getPageMetaData(blog);
  });

  // console.log(allBlogs);

  return allBlogs;
}

export const getPageMetaData = (post: any) => {
  const getTags = (tags: any) => {
    const allTags = tags.map((tag: any) => {
      return tag.name;
    });

    return allTags;
  };

  return {
    id: post.id,
    title: post.properties.title.title[0].plain_text,
    tags: getTags(post.properties.tags.multi_select),
    description: post.properties.description.rich_text[0].plain_text,
    date: dayjs(post.properties.created_at.created_time).format("MMM D, YYYY"),
    slug: post.properties.slug.rich_text[0].plain_text,
    cover: post.properties.cover.files[0].external.url,
  };
};
