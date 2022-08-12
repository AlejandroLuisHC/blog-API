const //Posts data
    titles      = [],
    bodies      = [],
    IDs         = [],
    userIDsPost = [];

const //Users data
    userId          = [],
    userName        = [],
    userUsername    = [],
    userEmail       = [],
    userAddress     = [],
    userPhone       = [],
    userWebsite     = [],
    userCompany     = [];

// Comments Data
const comments = []

window.onload = storeUsers();

function storeUsers() {
    fetch("http://localhost:3000/users")
        .then(res => res.json())
        .then(data => {
            data.forEach(e => {
                userId.push(e.id)
                userName.push(e.name)
                userUsername.push(e.username)
                userEmail.push(e.email)
                userAddress.push(e.address)
                userPhone.push(e.phone)
                userWebsite.push(e.website)
                userCompany.push(e.company)
            });
        });
}

window.onload = storeComments();

function storeComments() {
    fetch("http://localhost:3000/comments")
        .then(res => res.json())
        .then(data => {
            data.forEach(e => {
                comments.push(e)
            });
        });
}

window.onload = displayPosts();

function displayPosts() {
    while (document.getElementById('postsContainer').firstChild) {
        document.getElementById('postsContainer').removeChild(document.getElementById('postsContainer').firstChild)
    }
    fetch("http://localhost:3000/posts")
        .then(res => res.json())
        .then(data => {
            console.log(data);
            data.forEach(e => {
                titles.push(e.title);
                bodies.push(e.body);
                IDs.push(e.id);
                userIDsPost.push(e.userId);
            });
            let postItsColors = ['rgb(245, 248, 208)', 'rgb(208, 248, 243)', 'rgb(248, 208, 237)', 'rgb(213, 248, 208)', 'rgb(255, 215, 174)', 'rgb(224, 174, 255)']
            let postItsRotations = ['', 'rotate(-.6deg)', 'rotate(-.9deg)', 'rotate(-1.2deg)', 'rotate(-1.5deg)', 'rotate(.6deg)', 'rotate(.9deg)', 'rotate(1.2deg)', 'rotate(1.5deg)']
            for (let i = titles.length - 1; i >= 0; i--) {
                let randomPostItColor = postItsColors[Math.floor(Math.random()*postItsColors.length)];
                let randomPostItRotation = postItsRotations[Math.floor(Math.random()*postItsRotations.length)];
                let article = document.createElement('article');
                article.className = `col-5 post postNum${i + 1}`;
                article.setAttribute("id", `${IDs[i]}`);
                article.style.backgroundColor = randomPostItColor;
                article.style.transform = randomPostItRotation;
                article.style.height = "130px";
                article.style.width = "400px";
                article.style.margin = "30px";

                article.innerHTML = `
                <div class="row justify-content-space-between title-container">
                    <div class="col-2 post-num">#${i + 1}</div>
                    <h4 onclick="moreInfo('${IDs[i]}', '${userIDsPost[i]}')" id="tit${i}" class="col-8 post-title">${titles[i]}</h4>
                    <div class="col-2 row title-btns">
                        <button onclick="editPost('tit${i}', 'cont${i}', '${IDs[i]}', '${userIDsPost[i]}')" class="col-1 edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button onclick="deletePost('${IDs[i]}')" class="col-1 delete-btn"><i class="fa-solid fa-trash-can"></i></button>
                    </div>               
                </div>
                <div class="row justify-content-center">
                    <button onclick="displayPost(this, 'postNum${i + 1}')" class="col-8 btn btn-primary read-btn">Read post</button>
                </div>
                <p style="display: none; margin-top: 10px;" id="cont${i}" class="post-content">${bodies[i]}</p>
                `
                document.getElementById('postsContainer').appendChild(article);
                
                let author = document.createElement('p');
                author.style.fontStyle = 'italic';
                author.style.fontSize = '12px';
                author.style.marginTop = '30px';
                author.style.display = 'none';
                author.style.cursor = 'pointer';
                author.addEventListener('click', () => {
                    moreInfo(`${IDs[i]}`, `${userIDsPost[i]}`)   
                });
                let userIndex = userId.indexOf(parseInt(userIDsPost[i]));
                userIndex < 0 ? author.textContent = `Post created by: Guest (${userIDsPost[i]})`:
                author.textContent = `Post created by: ${userName[userIndex]}`;
                article.insertAdjacentElement("beforeend", author);
                adjustTitleFontSize(`tit${i}`);
            };
        });
    }

function displayPost(btn, post) {
    const 
        info = document.querySelectorAll(`.${post} p`),
        postEle = document.querySelector(`.${post}`);
    info.forEach(p => {
        if(p.style.display === "none") {
            postEle.style.height = '500px';
            p.style.position = "relative";
            p.style.display = "block";
            btn.textContent = "Close post";
        } else {
            postEle.style.height = '130px';
            p.style.display = "none";
            btn.textContent = "Read post";
        };
    });
}

function moreInfo(id, userID) {
    if ((parseInt(userID) >=0) && (parseInt(userID) < 11)) {
        let userIndex = userId.indexOf(parseInt(userID));
        let postComments = []
        comments.forEach(com => {
            if (com.postId === parseInt(id)) {
                postComments.push(com);
            };
        })
        let commentsHTML = ``
        postComments.forEach(com => {
            commentsHTML += `<b>${com.name}</b> - ${com.email}<br><br>${com.body}<br><hr>`
        })
    
        console.log(postComments);
    
        const infoContainer = document.createElement('section');
        infoContainer.className = "more-info-container";
        infoContainer.setAttribute("id", "infoContainer");
        infoContainer.innerHTML = `
            <div class="row justify-content-center">
                <h2 class="col-8 title-more-info">Post information</h2>
            </div>
            <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Post information:   
                        </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            <p>
                                Number of comments: <b>${postComments.length}</b>
                            </p>    
                            <p>
                                Post author: <b>${userUsername[userIndex]}</b>
                            </p>    
                            <p>
                                Post number: <b>${id}</b>
                            </p>    
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingTwo">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Author information:
                        </button>
                    </h2>
                    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div id="comments-section" class="accordion-body">
                            <p>
                                <b>${userUsername[userIndex]}</b>'s name is: <b>${userName[userIndex]}</b>. 
                            </p>
                            <p>
                                ${userName[userIndex]} works at <b>${userCompany[userIndex].name}</b>, a company located in <b>${userAddress[userIndex].city}.</b> 
                            </p>
                            <p>
                                Having any questions, you may contact ${userName[userIndex]} via email: <u>${userEmail[userIndex]}</u>
                            </p>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="headingThree">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Read Comments:
                        </button>
                    </h2>
                    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div class="accordion-body comments-box">
                            <p>${commentsHTML}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row justify-content-evenly">
                <button onclick="closeMoreInfo();" type="button" class="col-6 btn btn-secondary close-more-info">Exit</button>
            </div>
        `
        if ((document.getElementById('main').firstChild.className !== "more-info-container") &&
            (document.getElementById('main').firstChild.className !== "pop-up")) {
            document.getElementById('main').insertAdjacentElement("afterbegin", infoContainer);
        };
    } else {

    }
}

function editPost(titleID, contentID, id, userID) {
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
            <h2 class="col-12 title-edit">Edit post</h2>
        </div>
        <form id="form">
            <div class="input-group mb-3">
                <span class="input-group-text">Title</span>
                <textarea maxlength="80" required id="updatedTitle" class="form-control edit-input-title" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">${title}</textarea>
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" >Content</span>
                <textarea maxlength="1000" required id="updatedContent" class="form-control edit-input-content" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">${content}</textarea>
            </div>
            <div class="row justify-content-evenly">
                <button onclick="closePopUp();" type="button" class="col-3 btn btn-secondary">Cancel</button>
                <button onclick="updatePost('${id}', '${userID}', event)" type="submit" class="col-3 btn btn-success">Save</button>
            </div>
        </form>
    `
    if ((document.getElementById('main').firstChild.className !== "more-info-container") &&
        (document.getElementById('main').firstChild.className !== "pop-up")) {
        document.getElementById('main').insertAdjacentElement("afterbegin", popUp);
    }
}

function updatePost(i, userID, e) {
    e.preventDefault();
    if (document.getElementById("form").checkValidity()) {
        const
            titleInfo = document.getElementById('updatedTitle').value,
            contentInfo = document.getElementById('updatedContent').value;

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: userID,
                id: i,
                title: titleInfo,
                body: contentInfo
            })
        };
        fetch(`http://localhost:3000/posts/${(i)}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                displayPosts();
            });
    }
}

document.getElementById("createPostBtn").addEventListener("click", createPost);
document.getElementById("navNewPost").addEventListener("click", createPost);

function createPost() {
    const popUp = document.createElement('section');
    popUp.className = "pop-up";
    popUp.setAttribute("id", "popUp");
    popUp.innerHTML = `
        <div class="row justify-content-center">
            <h2 class="col-12 title-edit">Create post</h2>
        </div>
        <form id="form"> 
            <div class="input-group mb-3">
                <span class="input-group-text">Author Id</span>
                <textarea required placeholder="Write your author ID or your name if you are a guest" id="author" class="form-control edit-input-author" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"></textarea>
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text">Post Title</span>
                <textarea required maxlength="80" placeholder="Write your post title here" id="updatedTitle" class="form-control edit-input-title" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"></textarea>
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text">Content</span>
                <textarea required maxlength="1000" placeholder="Write your post here" id="updatedContent" class="form-control edit-input-content" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"></textarea>
            </div>
            <div class="row justify-content-evenly">
                <button onclick="closePopUp();" type="button" class="col-3 btn btn-secondary">Cancel</button>
                <button onclick="uploadPost(event)" type="submit" class="col-3 btn btn-success">Post it!</button>
            </div>
        </form>
    `;
    if ((document.getElementById('main').firstChild.className !== "more-info-container") &&
        (document.getElementById('main').firstChild.className !== "pop-up")) {
        document.getElementById('main').insertAdjacentElement("afterbegin", popUp);
    };
}

function uploadPost(e) {
    e.preventDefault();
    if (document.getElementById("form").checkValidity()) {
        const
            titleInfo = document.getElementById('updatedTitle').value,
            contentInfo = document.getElementById('updatedContent').value,
            author = document.getElementById('author').value,
            newId = 0,
            pos = 0;

        fetch("http://localhost:3000/posts")
            .then(res => res.json())
            .then(data => {
                newId = data[data.length - 1].id + 1
                pos = data[data.length] + 1
            })

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: author,
                id: newId,
                title: titleInfo,
                body: contentInfo
            })
        };
        
        fetch('http://localhost:3000/posts', requestOptions)
            .then(response => response.json())
            .then(data => {
                let article = document.createElement('article');
                article.className = "col-5 post";
                article.setAttribute("id", `${pos}`)
                article.innerHTML = `
                    <div class="row title-container">
                        <div class="col-2 post-num">#${pos + 1}</div>
                        <h4 id="tit${pos}" class="col-8 post-title">${titleInfo}</h4>
                        <button onclick="editPost('${pos}')" class="col-1 edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button onclick="deletePost('tit${pos}', 'cont${pos}')" class="col-1 delete-btn"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                    <p id="cont${pos}" class="post-content">${contentInfo}</p>
                `
                document.getElementById('postsContainer').insertAdjacentElement("afterbegin", article);
            });
    }
}

function closePopUp() {
    document.getElementById('main').removeChild(document.getElementById('popUp'));
}
function closeMoreInfo() {
    document.getElementById('main').removeChild(document.getElementById('infoContainer'));
}

function deletePost(id) {
    if ((document.getElementById('main').firstChild.className !== "more-info-container") &&
        (document.getElementById('main').firstChild.className !== "pop-up")) {
        const element = document.querySelector('#delete-request .status');
        fetch(`http://localhost:3000/posts/${id}`, { method: 'DELETE' })
            .then(() => displayPosts());
    };
}


    // Control title size according to its length

function adjustTitleFontSize(title) {
    let titleEle = document.getElementById(`${title}`)
    let titleContent = document.getElementById(`${title}`).textContent

    if (titleContent.length > 60) {
        titleEle.style.fontSize = "15px"
    } else if (titleContent.length > 45) {
        titleEle.style.fontSize = "17px"
    } else if (titleContent.length > 30) {
        titleEle.style.fontSize = "20px"
    } else if (titleContent.length > 20) {
        titleEle.style.fontSize = "22px"
    }

}

    // Media Query to addapt better to small devices

const screen = window.matchMedia("(max-width: 420px)");
adaptPostSmallDevice(screen);
screen.addListener(adaptPostSmallDevice);

function adaptPostSmallDevice(x) {
    const articles = document.querySelectorAll('.post');
    if (x.matches) { // 
        articles.forEach(art => {
            art.style.width = "380px"
        });   
    } else {
        articles.forEach(art => {
            art.style.width = "400px"
        }); 
    };
}

