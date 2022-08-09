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
                    <button onclick="editPost(tit${i}, cont${i})" class="col-1 edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button onclick="deletePost(tit${i}, cont${i})" class="col-1 delete-btn"><i class="fa-solid fa-trash-can"></i></button>
                </div>
                <p id="cont${i}" class="post-content">${bodies[i]}</p>
            `
            document.getElementById('postsContainer').appendChild(article);
        };
    })


function editPost(titleID, contentID) {
    const
        title = document.getElementById(titleID),
        content = document.getElementById(contentID),
        popUp = document.createElement('section');

    popUp.className = "pop-up";
    popUp.setAttribute("id", "popUp")
    popUp.innerHTML = `
        <div class="row justify-content-center">
            <h2 class="col-8 title-edit">Edit post</h2>
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">Title</span>
            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
        </div><div class="input-group mb-3">
            <span class="input-group-text" >Content</span>
            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
        </div>
        <div class="row justify-content-evenly">
        <button onclick="closePopUp();" type="button" class="col-3 btn btn-secondary">Cancel</button>
        <button onclick="updatePost()" type="button" class="col-3 btn btn-success">Update</button>
        </div>
    `
    if (document.getElementById('main').contains(popUp) === false) {
        document.getElementById('main').appendChild(popUp);
    }
}

function closePopUp() {
    document.getElementById('main').removeChild(document.getElementById('popUp'));
}
