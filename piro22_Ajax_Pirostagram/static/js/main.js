function getCsrfToken() {
    return document.querySelector('[name=csrfmiddlewaretoken]').value;
}

// 댓글 삭제 
function addDeleteEventListener(button) {
    button.addEventListener('click', async function(e) {
        e.preventDefault();
        if (confirm('댓글을 삭제하시겠습니까?')) {
            const commentId = this.dataset.commentId;
            try {
                const response = await fetch(`/comment/${commentId}/delete/`, {
                    method: 'POST',
                    headers: {
                        'X-CSRFToken': getCsrfToken(),
                    }
                });
                const data = await response.json();
                if (data.success) {
                    const commentElement = document.getElementById(`comment-${commentId}`);
                    if (commentElement) {
                        commentElement.remove();
                    }
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    });
}

// 게시물 클릭 시 상세 페이지로 이동
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.posts__photo').forEach(post => {
        post.addEventListener('click', function() {
            const postId = this.getAttribute('data-post-id');
            if (postId) {
                window.location.href = `/post/${postId}/`;
            }
        });
    });

    // 좋아요 
    const likeBtn = document.querySelector('.like-btn');
    if (likeBtn) {
        likeBtn.addEventListener('click', async function() {
            const postId = this.dataset.postId;
            try {
                const response = await fetch(`/post/${postId}/like/`, {
                    method: 'POST',
                    headers: {
                        'X-CSRFToken': getCsrfToken(),
                    }
                });
                const data = await response.json();
                if (data.success) {
                    this.classList.toggle('active');
                    if (data.liked) {
                        this.innerHTML = `❤️ 좋아요 ${data.likes_count}개`;
                    } else {
                        this.innerHTML = `🤍 좋아요`;
                    }
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }

    // 댓글 추가 
    const commentForm = document.querySelector('.comment-form');
    if (commentForm) {
        commentForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const postId = document.querySelector('.like-btn').dataset.postId;
            const content = this.querySelector('input[name="content"]').value;

            try {
                const response = await fetch(`/post/${postId}/comment/`, {
                    method: 'POST',
                    headers: {
                        'X-CSRFToken': getCsrfToken(),
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ content })
                });
                const data = await response.json();
                if (data.success) {
                    const commentsContainer = document.querySelector('.comments-container');
                    const newComment = `
                        <div class="comment" id="comment-${data.comment_id}">
                            <span class="comment-content">
                                <strong>${data.author}</strong> ${data.content}
                            </span>
                            <button class="delete-comment-btn" data-comment-id="${data.comment_id}">삭제</button>
                        </div>
                    `;
                    commentsContainer.insertAdjacentHTML('afterbegin', newComment);
                    this.reset();
                    
                    
                    const newDeleteBtn = document.querySelector(`#comment-${data.comment_id} .delete-comment-btn`);
                    addDeleteEventListener(newDeleteBtn);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }

    document.querySelectorAll('.delete-comment-btn').forEach(button => {
        addDeleteEventListener(button);
    });
});
