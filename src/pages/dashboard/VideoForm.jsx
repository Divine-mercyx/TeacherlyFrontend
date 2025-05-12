import App from "../../App.jsx";

const VideoForm = (props) => {

    const { handleSubmit, formData, handleChange, setIsModalOpen } = props;

    return (
        <>
            <form onSubmit={handleSubmit} className="upload-form">
                <div className="form-group">
                    <label>Category</label>
                    <select
                        name="category"
                        required
                        value={formData.category}
                        onChange={handleChange}
                    >
                        <option value="">Select a category</option>
                        <option value="math">Mathematics</option>
                        <option value="science">Science</option>
                        <option value="history">History</option>
                        <option value="language">Languages</option>
                        <option value="arts">Arts</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="video-description">Description</label>
                    <textarea
                        id="video-description"
                        name="description"
                        placeholder="Enter video description"
                        rows="4"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label>Upload Video</label>
                    <div className="file-upload-area">
                        <i className="fas fa-cloud-upload-alt"></i>
                        <p>Drag and drop your video here or</p>
                        <button type="button" className="btn btn-outline">Browse Files</button>
                        <input
                            type="file"
                            id="video-file"
                            name="videoFile"
                            accept="video/*"
                            required
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="modal-footer">
                    <button onClick={() => setIsModalOpen(false)} className="btn btn-outline"
                            id="cancel-upload">Cancel
                    </button>
                    <button className="btn btn-primary">Upload Video</button>
                </div>
            </form>
        </>
    )
}
export default VideoForm;