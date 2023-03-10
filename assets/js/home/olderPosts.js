let olderPosts = document.getElementById("olderPosts");

// getting products implementation below
class OlderPosts {
  async getPosts(){
    try {
      let result = await fetch("older.json");
      let data = await result.json();
      let posts = data.posts;
      posts = posts.map(post => {
        const {title, date, description, read} = post.fields;
        const {id} = post.sys;
        const image = post.fields.image.fields.file.url;
        return {title, date, description, id, image, read};
      })
      return posts;
    } catch (error) {
      console.log(error);      
    }
  }
}

// display products implementation
class OlderPostsUI {
  loadAllOlderPosts(posts){
    let indexPostResult = "";
    posts.forEach(post => {
      indexPostResult += `<a href="#" class="article d-grid">
      <div class="older-posts-article-image-wrapper">
          <img src=${post.image} alt="" class="article-image">
      </div>

      <div class="article-data-container">

          <div class="article-data">
              <span>${post.date}</span>
              <span class="article-data-spacer"></span>
              <span>${post.read}</span>
          </div>

          <h3 class="title article-title">${post.title}</h3>
          <p class="article-description">${post.description}</p>

      </div>
  </a>`      
    });
    
    olderPosts.innerHTML = indexPostResult;
  }
}

// DOM load event 
document.addEventListener("DOMContentLoaded", ()=>{
  const ui = new OlderPostsUI();
  const posts = new OlderPosts();

  //get product Posts
  posts.getPosts().then(posts => {
    ui.loadAllOlderPosts(posts);
  })
})

