// alert("Working");
// method to submit the form data form new post usnig AJAX
{
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();

            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost); 
                    deletePost($(' .delete-post-button', newPost));
                }, error: function(error){
                    console.log(error.responseText);
                }
            })
        });
    }

    // method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
        <div id="post-content">
            ${post.content }
                <div id="post_user_name">
                    ~${post.user.name}
                </div>
        </div>
            <button class="delete-post">
                <a class="delete-post-button" href="posts/destroy/${post._id}">Delete</a>
            </button>
                <div class="post-comments">
                        <form action="/comments/create" method="POST">
                            <input id="comment" type="text" name="content"
                                placeholder="Comment on this post...">
                            <input type="hidden" name="post" value="<%= post._id %>">
                            <input id="submit-comment" type="submit" value="+">
                        </form>
    
                            <div class="post-comments-list">
                                <ul id="post-comment-<%=post._id %>">
                                    
                                </ul>
                            </div>
                </div>
    </li>`)
    }

    // method to delete a post from DOM
    let deletePost = function(deleteLink){
        $(deleteLink).click(function(e){
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data){
                    $(`#post-${data.post_id}`).remove();
                }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });
    }
    createPost();
}