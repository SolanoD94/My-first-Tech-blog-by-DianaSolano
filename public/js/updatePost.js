// UPDATE POST
async function updateFormHandler(event) {
  event.preventDefault();
  const blog_title = document.querySelector("#updatePostTitle").value;
  const description = document.querySelector("#updatePostDescription").value;
  const blog_id = event.target.getAttribute("att-blog-id");
  console.log(blog_id);
  try {
    const response = await fetch(`/api/newPost/${blog_id}`, {
      method: "PUT",
      body: JSON.stringify({
        blog_title,
        description,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log(`Post updated`);
      // Reload the page to display the new post
      location.reload();
    } else {
      console.log(`Failed to update post`);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

document.querySelector("#saveBtn").addEventListener("click", updateFormHandler);
