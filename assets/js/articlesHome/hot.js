let quickRead = document.getElementById("quickRead");

// getting products implementation below
class QuickRead {
  async getPosts(){
    try {
      let result = await fetch("quick.json");
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
class QuickPostsUI {
  loadAllQuickRead(posts){
    let indexPostResult = "";
    posts.forEach(post => {
      indexPostResult += `<a href="#" class="article swiper-slide">
      <img src=${post.image} alt="" class="article-image">

      <div class="article-data-container">
          <div class="article-data">
              <span>${post.date}</span>
              <span class="article-data-spacer"></span>
              <span>${post.read}</span>
          </div>
          <h3 class="title article-title">${post.title}</h3>
      </div>
  </a>`      
    });
    
    quickRead.innerHTML = indexPostResult;
  }
}

// DOM load event 
document.addEventListener("DOMContentLoaded", ()=>{
  const ui = new QuickPostsUI();
  const posts = new QuickRead();

  //get product Posts
  posts.getPosts().then(posts => {
    ui.loadAllQuickRead(posts);
  })
})

