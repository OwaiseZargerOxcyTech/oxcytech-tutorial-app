import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import md5 from "md5";
import fetch from "node-fetch";
import { put } from "@vercel/blob";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

async function deleteBlob(blobName) {
  const token = "VvA3XP8hT39P2c1JQ2vfRhQJ";

  // Replace with your Vercel token
  const projectId = "prj_0Ef6PmzBdYoW4aPREbzAk1ZTXIQy"; // Replace with your Vercel project ID

  try {
    const response = await fetch(
      `https://api.vercel.com/v2/now/files/${projectId}/${blobName}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete blob");
    }

    console.log("Blob deleted successfully");
  } catch (error) {
    console.error("Error deleting blob:", error);
  }
}

function getBlobNameFromUrl(blobUrl) {
  try {
    const url = new URL(blobUrl);
    const pathParts = url.pathname.split("/");
    const blobName = pathParts[pathParts.length - 1];
    return blobName;
  } catch (error) {
    console.error("Error extracting blob name:", error);
    return null;
  }
}

export async function POST(req, res) {
  let apiName;
  let body;
  let data;
  const contentType = req.headers.get("Content-Type");
  if (contentType.includes("application/json")) {
    body = await req.json();
    ({ apiName } = body);
  } else if (contentType.includes("multipart/form-data")) {
    data = await req.formData();
    apiName = data.get("apiName");
  }

  if (apiName === "addemployee") {
    try {
      const username = data.get("username");
      const authorName = data.get("authorName");
      const email = data.get("email");
      const password = data.get("password");
      const authorDetail = data.get("authorDetail");
      const image = data.get("image");

      if (!password) {
        throw new Error("Password is required");
      }

      const hashedPassword = md5(password);
      let newAuthor;
      let blobUrl = null;

      newAuthor = await prisma.usert.create({
        data: {
          username,
          authorName,
          email,
          password: hashedPassword,
          userRole: "employee",
          authorDetail,
        },
      });

      if (image && image.name) {
        const filenameParts = image.name.split(".");
        const fileExtension = filenameParts[filenameParts.length - 1];

        const blob = await put(
          `${authorName}-${newAuthor.id}.${fileExtension}`,
          image,
          {
            access: "public",
          }
        );
        blobUrl = blob.url;
      }

      await prisma.usert.update({
        where: { id: newAuthor.id },
        data: {
          authorImage: blobUrl,
        },
      });

      return NextResponse.json(
        { result: "successfully created employee", authorId: newAuthor.id },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error during employee creation:", error);
      return NextResponse.json(
        { error: "Failed to add employee" },
        { status: 500 }
      );
    }
  } else if (apiName === "deleteemployee") {
    try {
      const { selectedId } = body;

      await prisma.usert.delete({
        where: { id: selectedId },
      });

      return NextResponse.json(
        { result: "successfully deleted employee" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error during deleting employee:", error);
      return NextResponse.json(
        { error: "Failed to delete employee" },
        { status: 500 }
      );
    }
  } else if (apiName === "unapproveblog") {
    try {
      const { selectedId } = body;

      const blog = await prisma.blogt.findUnique({ where: { id: selectedId } });

      const BlobName = getBlobNameFromUrl(blog.image);

      deleteBlob(BlobName);

      await prisma.blogt.delete({ where: { id: selectedId } });

      return NextResponse.json(
        { result: "successfully unapproved blog" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error during unapproving blog:", error);
      return NextResponse.json(
        { error: "Failed to unapprove blog" },
        { status: 500 }
      );
    }
  } else if (apiName === "updateemployee") {
    try {
      const selectedId = data.get("selectedId");
      const authorName = data.get("authorName");
      const username = data.get("username");
      const email = data.get("email");
      const password = data.get("password");
      const authorDetail = data.get("authorDetail");
      

      const image = data.get("image");
      const updatedData = {};
      
      const id = parseInt(selectedId, 10);
      if (isNaN(id)) {
        return NextResponse.json(
          { error: "Invalid Employee ID" },
          { status: 400 }
        );
      }
      // console.log("selectedID : ",id, "Type of selectedId: ", typeof id);

      if (username) {
        updatedData.username = username;
      }

      if (authorName) {
        updatedData.authorName = authorName;
      }

      if (email) {
        updatedData.email = email;
      }

      if (password) {
        const hashedPassword = md5(password);
        updatedData.password = hashedPassword;
      }

      if (authorDetail) {
        updatedData.authorDetail = authorDetail;
      }
      await prisma.usert.update({
        where: { id: id },
        data: updatedData,
      });

      if (image && image.name) {
        const filenameParts = image.name.split(".");
        const fileExtension = filenameParts[filenameParts.length - 1];

        // Upload image to Vercel Blob storage
        const blob = await put(
          `${authorName}-${selectedId}.${fileExtension}`,
          image,
          {
            access: "public",
          }
        );

        // Update the author entry with the image URL
        await prisma.usert.update({
          where: { id: selectedId },
          data: {
            authorImage: blob.url,
          },
        });
      }

      return NextResponse.json(
        { result: "successfully updated employee" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error during employee updation:", error);
      return NextResponse.json(
        { error: "Failed to update employee" },
        { status: 500 }
      );
    }
  } else if (apiName === "requestfordelete") {
    try {
      const { selectedId, published, blogLiveId } = body;

      if (published === "Y") {
        await prisma.bloglivet.update({
          where: { id: selectedId },
          data: {
            delete_request: "Y",
          },
        });
      } else if (
        blogLiveId === undefined ||
        blogLiveId === null ||
        blogLiveId === "null" ||
        blogLiveId === ""
      ) {
        await prisma.blogt.update({
          where: { id: selectedId },
          data: {
            delete_request: "Y",
          },
        });
      } else {
        await prisma.blogt.update({
          where: { id: selectedId },
          data: {
            delete_request: "Y",
          },
        });
        await prisma.bloglivet.update({
          where: { id: blogLiveId },
          data: {
            delete_request: "Y",
          },
        });
      }

      return NextResponse.json(
        { result: "successfully requested blog for delete" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error during blog delete request:", error);
      return NextResponse.json(
        { error: "Failed to request blog for delete" },
        { status: 500 }
      );
    }
  } else if (apiName === "canceldeleterequest") {
    try {
      const { selectedId, published, blogLiveId } = body;

      if (published === "Y") {
        await prisma.bloglivet.update({
          where: { id: selectedId },
          data: {
            delete_request: "N",
          },
        });
      } else if (
        blogLiveId === undefined ||
        blogLiveId === null ||
        blogLiveId === "null" ||
        blogLiveId === ""
      ) {
        await prisma.blogt.update({
          where: { id: selectedId },
          data: {
            delete_request: "N",
          },
        });
      } else {
        await prisma.blogt.update({
          where: { id: selectedId },
          data: {
            delete_request: "N",
          },
        });
        await prisma.bloglivet.update({
          where: { id: blogLiveId },
          data: {
            delete_request: "N",
          },
        });
      }

      return NextResponse.json(
        { result: "successfully cancelled delete request" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error during cancelling delete request:", error);
      return NextResponse.json(
        { error: "Failed to cancel delete request" },
        { status: 500 }
      );
    }
  } else if (apiName === "approveblogfuture") {
    try {
      const { selectedId } = body;
      const blogId = parseInt(selectedId, 10);
      if (isNaN(blogId)) {
        return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
      }

      const blog = await prisma.blogt.findUnique({
        where: { id: blogId },
      });

      if (!blog) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      }
      const publishDateObj = blog.publishDate;

      if (publishDateObj && publishDateObj > new Date()) {
        await prisma.blogt.update({
          where: { id: blog.id },
          data: {
            published: "scheduled",
            scheduledAt: publishDateObj,
          },
        });
        return NextResponse.json(
          { result: "Blog is scheduled for future publishing" },
          { status: 200 }
        );
      }
    } catch (error) {
      console.error("Error during approving blog:", error);
      return NextResponse.json(
        { error: "Failed to approve blog" },
        { status: 500 }
      );
    }
  } else if (apiName === "approveblog") {
    try {
      const { selectedId } = body;
      const blogId = parseInt(selectedId, 10);
      if (isNaN(blogId)) {
        return NextResponse.json({ error: "Invalid blog ID" }, { status: 400 });
      }

      const blog = await prisma.blogt.findUnique({
        where: { id: blogId },
      });

      if (!blog) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      }

      const publishDateObj = blog.publishDate;

      if (publishDateObj <= new Date()) {
        const createdBlog = await prisma.bloglivet.create({
          data: {
            title: blog.title,
            description: blog.description,
            content: blog.content,
            image: blog.image,
            publishDate: publishDateObj,
            slug: blog.slug,
            published: "Y",
            delete_request: blog.delete_request,
            featuredpost: blog.featuredpost,
            // Establishing the relation with Author
            author: {
              connect: { id: blog.author_id },
            },
            // Establishing the relation with Category
            category: {
              connect: { id: blog.category_id },
            },
          },
        });

        if (createdBlog) {
          await prisma.blogt.delete({ where: { id: blog.id } });
          return NextResponse.json(
            { result: "successfully approved and published blog" },
            { status: 200 }
          );
        } else {
          throw new Error("Failed to create live blog entry");
        }
      } else {
        return NextResponse.json(
          { result: "Blog cannot be published yet" },
          { status: 400 }
        );
      }
    } catch (error) {
      console.error("Error during approving blog:", error);
      return NextResponse.json(
        { error: "Failed to approve blog" },
        { status: 500 }
      );
    }
  } else if (apiName === "getblogcountforemp") {
    try {
      const { selectedId } = body;

      const blogsCountResult = await prisma.$queryRaw`
    SELECT COUNT(*)
    FROM (
      SELECT
        1
        FROM public."Blogt" b
      WHERE b.author_id = ${selectedId}
    
      UNION ALL
    
      SELECT
        1
        FROM public."Bloglivet" bl
      LEFT JOIN public."Blogt" b ON bl.id = b.bloglive_id
      WHERE bl.author_id = ${selectedId} and b.bloglive_id IS NULL
    ) AS combined;
    `;

      const blogscount = parseInt(blogsCountResult[0].count);

      return NextResponse.json({ result: blogscount }, { status: 200 });
    } catch (error) {
      console.error("Error during getting employee blogs count data:", error);
      return NextResponse.json(
        { error: "Failed to get employee blogs count data" },
        { status: 500 }
      );
    }
  } else if (apiName === "addfavicon") {
    const image = data.get("image");
    if (typeof image === "object") {
      const favicon = await prisma.favicont.findFirst();
      if (!favicon) {
        const blob = await put(`favicon.ico`, image, {
          access: "public",
        });

        await prisma.favicont.create({
          data: {
            image: blob.url,
          },
        });
      } else {
        const BlobName = getBlobNameFromUrl(favicon.image);

        deleteBlob(BlobName);

        const blob = await put(`favicon.ico`, image, {
          access: "public",
        });

        await prisma.favicont.update({
          where: { id: favicon.id },
          data: {
            image: blob.url,
          },
        });
      }
    }
  } else if (apiName === "getfavicon") {
    try {
      const favicon = await prisma.favicont.findFirst();

      return NextResponse.json({ result: favicon }, { status: 200 });
    } catch (error) {
      console.error("Error during getting favicon data:", error);
      return NextResponse.json(
        { error: "Failed to get favicon data" },
        { status: 500 }
      );
    }
  } else if (apiName === "getlatestfeaturedblogs") {
    try {
      const latestBlogs = await prisma.bloglivet.findMany({
        where: {
          featuredpost: "yes",
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
      });

      return NextResponse.json({ result: latestBlogs }, { status: 200 });
    } catch (error) {
      console.error("Error during getting featured blogs data:", error);
      return NextResponse.json(
        { error: "Failed to get featured blogs data" },
        { status: 500 }
      );
    }
  } else if (apiName === "addtutorial") {
    try {
      const { title, authorId, is_active } = body;

      const slug = title
        .toLowerCase() // Convert the title to lowercase
        .replace(/[^\w\s-]/g, "") // Remove non-word characters (excluding spaces and dashes)
        .trim() // Trim leading and trailing spaces
        .replace(/\s+/g, "-") // Replace spaces with dashes
        .replace(/-+/g, "-");

      await prisma.tutorialTopic.create({
        data: {
          title,
          slug,
          author_id: authorId,
          is_active,
        },
      });

      return NextResponse.json(
        { result: "successfully created tutorial" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error during tutorial creation:", error);
      return NextResponse.json(
        { error: "Failed to add tutorial" },
        { status: 500 }
      );
    }
  } else if (apiName === "gettutorials") {
    try {
      const tutorials = await prisma.tutorialTopic.findMany();

      return NextResponse.json({ result: tutorials }, { status: 200 });
    } catch (error) {
      console.error("Error during getting tutorials:", error);
      return NextResponse.json(
        { error: "Failed to get tutorials" },
        { status: 500 }
      );
    }
  } else if (apiName === "updatetutorial") {
    try {
      const { selectedId, title, authorId, is_active } = body;

      const slug = title
        .toLowerCase() // Convert the title to lowercase
        .replace(/[^\w\s-]/g, "") // Remove non-word characters (excluding spaces and dashes)
        .trim() // Trim leading and trailing spaces
        .replace(/\s+/g, "-") // Replace spaces with dashes
        .replace(/-+/g, "-");

      await prisma.tutorialTopic.update({
        where: { id: selectedId },
        data: {
          title,
          slug,
          author_id: authorId,
          is_active,
        },
      });

      return NextResponse.json(
        { result: "tutorial updated successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error during updating tutorials:", error);
      return NextResponse.json(
        { error: "Failed to update tutorials" },
        { status: 500 }
      );
    }
  } else if (apiName === "deletetutorial") {
    try {
      const { selectedId } = body;

      await prisma.tutorialTopic.delete({
        where: { id: selectedId },
      });

      return NextResponse.json(
        { result: "tutorial deleted successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error during deleting tutorials:", error);
      return NextResponse.json(
        { error: "Failed to delete tutorials" },
        { status: 500 }
      );
    }
  } else if (apiName === "addsubtopic") {
    try {
      const { title, desc, content, published, topicslug, preference } = body;

      const slug = title
        .toLowerCase() // Convert the title to lowercase
        .replace(/[^\w\s-]/g, "") // Remove non-word characters (excluding spaces and dashes)
        .trim() // Trim leading and trailing spaces
        .replace(/\s+/g, "-") // Replace spaces with dashes
        .replace(/-+/g, "-");

      const topicData = await prisma.tutorialTopic.findFirst({
        where: { slug: topicslug },
      });

      await prisma.tutorialSubtopic.create({
        data: {
          title,
          description: desc,
          content,
          published,
          topic_id: topicData.id,
          slug,
          preference: parseInt(preference),
        },
      });

      return NextResponse.json(
        { result: "subtutorial created successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error during creating subtutorials:", error);
      return NextResponse.json(
        { error: "Failed to create subtutorials" },
        { status: 500 }
      );
    }
  } else if (apiName === "approvesubtopic") {
    try {
      const { selectedId } = body;

      const subtopic = await prisma.tutorialSubtopic.findUnique({
        where: { id: selectedId },
      });

      if (subtopic.subtopiclive_id === null) {
        await prisma.tutorialSubtopicLive.create({
          data: {
            title: subtopic.title,
            description: subtopic.description,
            content: subtopic.content,
            slug: subtopic.slug,
            published: "Y",
            delete_request: subtopic.delete_request,
            preference: subtopic.preference,
            topic_id: subtopic.topic_id,
          },
        });

        await prisma.tutorialSubtopic.delete({ where: { id: subtopic.id } });
      } else {
        await prisma.tutorialSubtopicLive.update({
          where: { id: subtopic.subtopiclive_id },
          data: {
            title: subtopic.title,
            description: subtopic.description,
            content: subtopic.content,
            published: "Y",
            delete_request: subtopic.delete_request,
            preference: subtopic.preference,
            topic_id: subtopic.topic_id,
          },
        });

        await prisma.tutorialSubtopic.delete({ where: { id: subtopic.id } });
      }

      return NextResponse.json(
        { result: "successfully approved tutorial" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error during approving tutorial:", error);
      return NextResponse.json(
        { error: "Failed to approve tutorial" },
        { status: 500 }
      );
    }
  } else if (apiName === "unapprovesubtopic") {
    try {
      const { selectedId } = body;

      await prisma.tutorialSubtopic.delete({ where: { id: selectedId } });

      return NextResponse.json(
        { result: "successfully unapproved subtopic" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error during unapproving subtopic:", error);
      return NextResponse.json(
        { error: "Failed to unapprove subtopic" },
        { status: 500 }
      );
    }
  } else if (apiName === "canceldeleterequestsubtopic") {
    try {
      const { selectedId, published, subTopicLiveId } = body;

      if (published === "Y") {
        await prisma.tutorialSubtopicLive.update({
          where: { id: selectedId },
          data: {
            delete_request: "N",
          },
        });
      } else if (
        subTopicLiveId === undefined ||
        subTopicLiveId === null ||
        subTopicLiveId === "null" ||
        subTopicLiveId === ""
      ) {
        await prisma.tutorialSubtopic.update({
          where: { id: selectedId },
          data: {
            delete_request: "N",
          },
        });
      } else {
        await prisma.tutorialSubtopic.update({
          where: { id: selectedId },
          data: {
            delete_request: "N",
          },
        });
        await prisma.tutorialSubtopicLive.update({
          where: { id: subTopicLiveId },
          data: {
            delete_request: "N",
          },
        });
      }

      return NextResponse.json(
        { result: "successfully cancelled delete request sub topic " },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error during cancelling delete request sub topic:", error);
      return NextResponse.json(
        { error: "Failed to cancel delete request sub topic" },
        { status: 500 }
      );
    }
  } else if (apiName === "displaysubtopics") {
    try {
      // const blogs = await prisma.blog.findMany();

      const { topicslug } = body;

      const subtopics = await prisma.$queryRaw`
      SELECT *
      FROM (
        SELECT
          b.id,
          b.title,
          b.description,
          b.content,
          b.slug,
          b.published,
          b.delete_request,
          b.subtopiclive_id
          FROM public."TutorialSubtopic" b 
          JOIN public."TutorialTopic" t ON b.topic_id = t.id
          WHERE t.slug = ${topicslug}
      
        UNION ALL
      
        SELECT
          bl.id,
          bl.title,
          bl.description,
          bl.content,
          bl.slug,
          bl.published,
          bl.delete_request,
          null
          FROM public."TutorialSubtopicLive" bl
        LEFT JOIN public."TutorialSubtopic" b ON bl.id = b.subtopiclive_id
        JOIN public."TutorialTopic" tl ON bl.topic_id = tl.id
        WHERE b.subtopiclive_id IS NULL AND tl.slug = ${topicslug}
      ) AS combined
      ORDER BY title;
      `;

      return NextResponse.json({ result: subtopics }, { status: 200 });
    } catch (error) {
      console.error("Error during getting subtopics data:", error);
      return NextResponse.json(
        { error: "Failed to get subtopics data" },
        { status: 500 }
      );
    }
  } else if (apiName === "deletesubtopic") {
    try {
      const { selectedId, published, slug, subTopicLiveId } = body;

      if (published === "Y") {
        await prisma.tutorialSubtopicLive.delete({
          where: { id: selectedId },
        });
      } else if (
        subTopicLiveId === undefined ||
        subTopicLiveId === null ||
        subTopicLiveId === "null" ||
        subTopicLiveId === ""
      ) {
        await prisma.tutorialSubtopic.delete({
          where: { id: selectedId },
        });
      } else {
        await prisma.tutorialSubtopic.delete({
          where: { id: selectedId },
        });
        await prisma.tutorialSubtopicLive.delete({
          where: { id: parseInt(subTopicLiveId) },
        });
      }

      return NextResponse.json(
        { result: "subtopic deleted successfully" },
        { status: 200 }
      );

      // Respond with success message
    } catch (error) {
      console.error("Error during subtopic delete:", error);
      return NextResponse.json(
        { error: "Failed to delete subtopic" },
        { status: 500 }
      );
    }
  } else if (apiName === "fetchsubtopic") {
    try {
      const { subTopicID, published } = body;
      let subtopic;

      if (published === "Y") {
        subtopic = await prisma.tutorialSubtopicLive.findUnique({
          where: { id: parseInt(subTopicID) },
        });
      } else {
        subtopic = await prisma.tutorialSubtopic.findUnique({
          where: { id: parseInt(subTopicID) },
        });
      }

      return NextResponse.json({ result: subtopic }, { status: 200 });
    } catch (error) {
      console.error("Error during fetching blog:", error);
      return NextResponse.json(
        { error: "Failed to fetch blog" },
        { status: 500 }
      );
    }
  } else if (apiName === "updatesubtopic") {
    try {
      const {
        title,
        desc,
        content,
        selectedId,
        published,
        subTopicLiveId,
        preference,
        topicslug,
      } = body;

      let slug = title
        .toLowerCase() // Convert the title to lowercase
        .replace(/[^\w\s-]/g, "") // Remove non-word characters (excluding spaces and dashes)
        .trim() // Trim leading and trailing spaces
        .replace(/\s+/g, "-") // Replace spaces with dashes
        .replace(/-+/g, "-");

      if (
        (subTopicLiveId !== undefined &&
          subTopicLiveId !== null &&
          subTopicLiveId !== "null" &&
          subTopicLiveId !== "") ||
        published === "Y"
      ) {
        slug = `${slug}-00000`;
      }

      const topicData = await prisma.tutorialTopic.findFirst({
        where: { slug: topicslug },
      });

      if (published === "Y") {
        await prisma.tutorialSubtopic.create({
          data: {
            title,
            description: desc,
            content,
            slug,
            published: "N",
            subtopiclive_id: selectedId,
            preference: parseInt(preference),
            topic_id: topicData.id,
          },
        });
      } else {
        await prisma.tutorialSubtopic.update({
          where: { id: selectedId },
          data: {
            title,
            description: desc,
            content,
            slug,
            published: "N",
            preference: parseInt(preference),
            topic_id: topicData.id,
          },
        });
      }

      return NextResponse.json(
        { result: "subtopic updated successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error during updating subtopic:", error);
      return NextResponse.json(
        { error: "Failed to update subtopic" },
        { status: 500 }
      );
    }
  } else if (apiName === "gettutorialsforemployee") {
    try {
      const { employeeId } = body;

      const tutorials = await prisma.tutorialTopic.findMany({
        where: { author_id: parseInt(employeeId) },
      });

      return NextResponse.json({ result: tutorials }, { status: 200 });
    } catch (error) {
      console.error("Error during getting tutorials for employee:", error);
      return NextResponse.json(
        { error: "Failed to get tutorials for employee" },
        { status: 500 }
      );
    }
  } else if (apiName === "gettutorial") {
    try {
      const { topicslug } = body;

      const tutorialData = await prisma.tutorialTopic.findFirst({
        where: { slug: topicslug },
      });

      return NextResponse.json({ result: tutorialData }, { status: 200 });
    } catch (error) {
      console.error("Error during getting tutorial data:", error);
      return NextResponse.json(
        { error: "Failed to get tutorial data" },
        { status: 500 }
      );
    }
  } else if (apiName === "requestfordeletesubtopic") {
    try {
      const { selectedId, published, subTopicLiveId } = body;

      if (published === "Y") {
        await prisma.tutorialSubtopicLive.update({
          where: { id: selectedId },
          data: {
            delete_request: "Y",
          },
        });
      } else if (
        subTopicLiveId === undefined ||
        subTopicLiveId === null ||
        subTopicLiveId === "null" ||
        subTopicLiveId === ""
      ) {
        await prisma.tutorialSubtopic.update({
          where: { id: selectedId },
          data: {
            delete_request: "Y",
          },
        });
      } else {
        await prisma.tutorialSubtopic.update({
          where: { id: selectedId },
          data: {
            delete_request: "Y",
          },
        });
        await prisma.tutorialSubtopicLive.update({
          where: { id: subTopicLiveId },
          data: {
            delete_request: "Y",
          },
        });
      }

      return NextResponse.json(
        { result: "successfully requested subtutorial for delete" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error during subtutorial delete request:", error);
      return NextResponse.json(
        { error: "Failed to request subtutorial for delete" },
        { status: 500 }
      );
    }
  } else if (apiName === "getactivetutorials") {
    try {
      const tutorials = await prisma.tutorialTopic.findMany({
        where: { is_active: "active" },
      });

      return NextResponse.json({ result: tutorials }, { status: 200 });
    } catch (error) {
      console.error("Error during getting tutorials:", error);
      return NextResponse.json(
        { error: "Failed to get tutorials" },
        { status: 500 }
      );
    }
  } else if (apiName === "getpublishedsubtutorials") {
    try {
      const { topicslug } = body;

      const tutorialData = await prisma.tutorialTopic.findFirst({
        where: { slug: topicslug },
      });

      const subtopics = await prisma.tutorialSubtopicLive.findMany({
        where: { topic_id: tutorialData.id, published: "Y" },
        orderBy: {
          preference: "asc",
        },
      });

      return NextResponse.json({ result: subtopics }, { status: 200 });
    } catch (error) {
      console.error("Error during getting published subtutorials:", error);
      return NextResponse.json(
        { error: "Failed to get published subtutorials" },
        { status: 500 }
      );
    }
  } else if (apiName === "getsubtutorialsbysubtopicslug") {
    try {
      const { subtopicslug } = body;

      const subtopicData = await prisma.tutorialSubtopicLive.findFirst({
        where: { slug: subtopicslug },
      });

      const tutorialData = await prisma.tutorialTopic.findFirst({
        where: { id: subtopicData.topic_id },
      });

      const subtopics = await prisma.tutorialSubtopicLive
        .findMany({
          where: { topic_id: tutorialData.id, published: "Y" },
          orderBy: { preference: "asc" },
        })
        .then((subtopics) => {
          return subtopics.map((subtopic) => ({
            ...subtopic,
            topicslug: tutorialData.slug,
            topicstatus: tutorialData.is_active,
            currentsubtopictitle: subtopicData.title,
            currentsubtopicdesc: subtopicData.description,
            currentsubtopiccontent: subtopicData.content,
          }));
        });

      return NextResponse.json({ result: subtopics }, { status: 200 });
    } catch (error) {
      console.error("Error during getting published subtutorials:", error);
      return NextResponse.json(
        { error: "Failed to get published subtutorials" },
        { status: 500 }
      );
    }
  } else if (apiName === "gettutorialstatus") {
    try {
      const { topicslug } = body;
      const tutorialData = await prisma.tutorialTopic.findFirst({
        where: { slug: topicslug },
      });

      return NextResponse.json(
        { result: tutorialData.is_active },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error during getting tutorials:", error);
      return NextResponse.json(
        { error: "Failed to get tutorials" },
        { status: 500 }
      );
    }
  } else if (apiName === "getsubtopicbyslug") {
    try {
      const { subtopicslug } = body;

      let subtopic;

      subtopic = await prisma.tutorialSubtopic.findFirst({
        where: { slug: subtopicslug },
      });

      if (!subtopic) {
        subtopic = await prisma.tutorialSubtopicLive.findFirst({
          where: { slug: subtopicslug },
        });
      }

      const topicData = await prisma.tutorialTopic.findFirst({
        where: { id: subtopic.topic_id },
      });

      const updatedSubtopic = { ...subtopic, author_id: topicData.author_id };

      return NextResponse.json({ result: updatedSubtopic }, { status: 200 });
    } catch (error) {
      console.error("Error during getting subtutorial by slug:", error);
      return NextResponse.json(
        { error: "Failed to get subtutorial by slug" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ error: "Invalid API name" }, { status: 400 });
}
