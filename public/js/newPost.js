// CREATE NEW BLOG POST FROM MODAL FORM
async function newFormHandler(event) {
  event.preventDefault();
  const blog_title = document.querySelector("#newPostTitle").value;
  const description = document.querySelector("#newPostDescription").value;
  try {
    const response = await fetch(`/api/newPost`, {
      method: "POST",
      body: JSON.stringify({
        blog_title,
        description,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log(`Post created`);
      // Reload the page to display the new post
      location.reload();
    } else {
      console.log(`Failed to create post`);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

document.querySelector("#submitBtn").addEventListener("click", newFormHandler);
