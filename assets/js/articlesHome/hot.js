let hotArticles = document.getElementById("hotArticles");

// getting products implementation below
class MainHotPosts {
  async getPosts(){
    try {
      let result = await fetch("mainHot.json");
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
class MainHotUI {
  loadAllMainHotPosts(posts){
    let indexPostResult = "";
    posts.forEach(post => {
      indexPostResult += `<a href="./post.html" class="trending-news-box">
      <div class="trending-news-img-box">
        <img
          src=${post.image}
          alt=""
          class="article-image"
        />
      </div>

      <div class="trending-news-data">
        <div class="article-data">
          <span>${post.date}</span>
          <span class="article-data-spacer"></span>
          <span>${post.read}</span>
        </div>

        <h3 class="title article-title">${post.title}</h3>
      </div>
    </a>`      
    });
    
    hotArticles.innerHTML = indexPostResult;
  }
}

// DOM load event 
document.addEventListener("DOMContentLoaded", ()=>{
  const ui = new MainHotUI();
  const posts = new MainHotPosts();

  //get product Posts
  posts.getPosts().then(posts => {
    ui.loadAllMainHotPosts(posts);
  })
})

