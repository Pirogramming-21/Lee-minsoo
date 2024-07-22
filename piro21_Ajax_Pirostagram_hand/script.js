document.addEventListener('DOMContentLoaded', () => {
    const likeBtns = document.querySelectorAll('.like-btn');
    const commentBtns = document.querySelectorAll('.add-comment-btn');

    likeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const post = e.target.closest('.post');
            const likeCount = post.querySelector('.like-count');
            const postId = post.dataset.postId;

            // AJAX request to update like count
            fetch('http://127.0.0.1:5000/like', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ postId: parseInt(postId) })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    likeCount.textContent = data.likes;
                }
            })
            .catch(error => console.error('Error:', error));
        });
    });

    commentBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const post = e.target.closest('.post');
            const commentInput = post.querySelector('.comment-input');
            const commentList = post.querySelector('.comment-list');
            const postId = post.dataset.postId;

            const commentText = commentInput.value;
            if (commentText === '') return;

            // AJAX request to add comment
            fetch('http://127.0.0.1:5000/add-comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ postId: parseInt(postId), comment: commentText })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const commentItem = document.createElement('li');
                    commentItem.classList.add('comment-item');
                    commentItem.innerHTML = `
                        <span>${commentText}</span>
                        <button class="delete-comment-btn" data-comment-id="${data.commentId}">Delete</button>
                    `;
                    commentList.appendChild(commentItem);
                    commentInput.value = '';

                    // Add event listener to delete button
                    commentItem.querySelector('.delete-comment-btn').addEventListener('click', deleteComment);
                }
            })
            .catch(error => console.error('Error:', error));
        });
    });

    const deleteComment = (e) => {
        const commentItem = e.target.closest('.comment-item');
        const post = e.target.closest('.post');
        const postId = post.dataset.postId;
        const commentId = e.target.dataset.commentId;

        // AJAX request to delete comment
        fetch('http://127.0.0.1:5000/delete-comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ postId: parseInt(postId), commentId: parseInt(commentId) })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                commentItem.remove();
            }
        })
        .catch(error => console.error('Error:', error));
    };

    // Attach delete event listeners to existing delete buttons
    document.querySelectorAll('.delete-comment-btn').forEach(btn => {
        btn.addEventListener('click', deleteComment);
    });
});
