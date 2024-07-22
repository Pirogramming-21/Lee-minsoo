from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # CORS 설정 추가

# In-memory data storage
posts = {
    1: {"likes": 0, "comments": []}
}

@app.route('/')
def index():
    return "Flask server is running!"

@app.route('/like', methods=['POST'])
def like_post():
    post_id = request.json.get('postId')
    if post_id in posts:
        posts[post_id]["likes"] += 1
        return jsonify(success=True, likes=posts[post_id]["likes"])
    return jsonify(success=False), 404

@app.route('/add-comment', methods=['POST'])
def add_comment():
    post_id = request.json.get('postId')
    comment = request.json.get('comment')
    if post_id in posts and comment:
        comment_id = len(posts[post_id]["comments"]) + 1
        posts[post_id]["comments"].append({"id": comment_id, "text": comment})
        return jsonify(success=True, commentId=comment_id)
    return jsonify(success=False), 404

@app.route('/delete-comment', methods=['POST'])
def delete_comment():
    post_id = request.json.get('postId')
    comment_id = request.json.get('commentId')
    if post_id in posts:
        comments = posts[post_id]["comments"]
        for comment in comments:
            if comment["id"] == comment_id:
                comments.remove(comment)
                return jsonify(success=True)
    return jsonify(success=False), 404

if __name__ == '__main__':
    app.run(debug=True)
