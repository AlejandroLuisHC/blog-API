let titles = [];
let bodies = [];

fetch("http://localhost:3000/posts")
    .then(res => res.json())
    .then(data => {
        console.log(data);
        data.forEach(e => {
            titles.push(e.title);
            bodies.push(e.body);
        });
        for(let i = 0; i < titles.length; i++) {
            let article = document.createElement('article');
            article.className = "col-5 post";
            article.innerHTML = `
                <div class="row title-container">
                    <div class="col-2"></div>
                    <h4 id="tit${i}" class="col-8">${titles[i]}</h4>
                    <button onclick="editPost('tit${i}', 'cont${i}')" class="col-1 edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button onclick="deletePost('tit${i}', 'cont${i}')" class="col-1 delete-btn"><i class="fa-solid fa-trash-can"></i></button>
                </div>
                <p id="cont${i}" class="post-content">${bodies[i]}</p>
            `
            document.getElementById('postsContainer').appendChild(article);
        };
    })


function editPost(titleID, contentID) {
    const
        titleEle = document.getElementById(titleID),
        contentEle = document.getElementById(contentID),
        title = titleEle.textContent,
        content = contentEle.textContent,
        popUp = document.createElement('section');

    popUp.className = "pop-up";
    popUp.setAttribute("id", "popUp");
    popUp.innerHTML = `
        <div class="row justify-content-center">
            <h2 class="col-8 title-edit">Edit post</h2>
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">Title</span>
            <textarea class="form-control edit-input-title" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">${title}</textarea>
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text" >Content</span>
            <textarea class="form-control edit-input-content" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">${content}</textarea>
        </div>
        <div class="row justify-content-evenly">
        <button onclick="closePopUp();" type="button" class="col-3 btn btn-secondary">Cancel</button>
        <button onclick="updatePost()" type="button" class="col-3 btn btn-success">Save</button>
        </div>
    `
    if (document.getElementById('main').firstChild.className !== "pop-up") {
        document.getElementById('main').insertAdjacentElement("afterbegin", popUp);
    }
}

function createPost() {
    const popUp = document.createElement('section');
    popUp.className = "pop-up";
    popUp.setAttribute("id", "popUp");
    popUp.innerHTML = `
    <div class="row justify-content-center">
    <h2 class="col-8 title-edit">Create post</h2>
    </div>
    <div class="input-group mb-3">
    <span class="input-group-text">Title</span>
    <textarea placeholder="Write your post title here" class="form-control edit-input-title" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"></textarea>
    </div>
    <div class="input-group mb-3">
    <span class="input-group-text" >Content</span>
    <textarea placeholder="Write your post here" class="form-control edit-input-content" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"></textarea>
    </div>
    <div class="row justify-content-evenly">
    <button onclick="closePopUp();" type="button" class="col-3 btn btn-secondary">Cancel</button>
    <button onclick="uploadPost()" type="button" class="col-3 btn btn-success">Update</button>
    </div>
    `
    if (document.getElementById('main').firstChild.className !== "pop-up") {
        document.getElementById('main').insertAdjacentElement("afterbegin", popUp);
    }
}

function closePopUp() {
    document.getElementById('main').removeChild(document.getElementById('popUp'));
}