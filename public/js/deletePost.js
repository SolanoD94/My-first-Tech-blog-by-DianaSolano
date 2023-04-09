// DELETE POST
const deletePostBtn = document.querySelectorAll("#deleteBtn");

deletePostBtn.forEach((deletePostBtn) => {
  deletePostBtn.addEventListener("click", async (event) => {
    const blog_id = event.target.getAttribute("att-blog-id");
    console.log(blog_id);
    const response = await fetch(`/api/newPost/${blog_id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      window.location.reload();
    } else {
      const data = await response.json();
      console.error(data.error);
    }
  });
});
