import { useEffect, useState, useCallback } from "react";
import { getUserReviewsApi, updateReviewApi, deleteReviewApi } from "../../service/reviewApi";
import toast from "react-hot-toast";
import {
  FaStar, FaEdit, FaTrash, FaCheck, FaTimes, FaCalendarAlt
} from "react-icons/fa";

const ReviewSkeleton = () => (
  <div>
    {[1, 2].map((i) => (
      <div key={i} className="review-card" style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
          <div>
            <div className="skeleton skeleton-title" style={{ width: 140, height: 18 }} />
            <div className="skeleton skeleton-text" style={{ width: 100, height: 12, marginTop: 4 }} />
          </div>
          <div className="skeleton" style={{ width: 80, height: 16, borderRadius: 4 }} />
        </div>
        <div className="skeleton skeleton-text" style={{ width: "90%", height: 14 }} />
        <div className="skeleton skeleton-text" style={{ width: "70%", height: 14, marginTop: 6 }} />
      </div>
    ))}
  </div>
);

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit states
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editRating, setEditRating] = useState(5);
  const [saving, setSaving] = useState(false);

  // Confirm delete states
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const fetchReviews = useCallback(async () => {
    try {
      const res = await getUserReviewsApi();
      setReviews(res.data.reviews || []);
    } catch {
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleStartEdit = (review) => {
    setEditingId(review._id);
    setEditText(review.reviewText || "");
    setEditRating(review.rating);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText("");
    setEditRating(5);
  };

  const handleSaveEdit = async (id) => {
    if (!editText.trim()) {
      toast.error("Review comment cannot be empty");
      return;
    }
    try {
      setSaving(true);
      const res = await updateReviewApi(id, {
        rating: editRating,
        reviewText: editText,
      });
      setReviews((prev) =>
        prev.map((r) => (r._id === id ? { ...r, ...res.data.review } : r))
      );
      setEditingId(null);
      toast.success("Review updated successfully!");
    } catch {
      toast.error("Failed to update review");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteReviewApi(id);
      setReviews((prev) => prev.filter((r) => r._id !== id));
      setDeleteConfirmId(null);
      toast.success("Review deleted successfully");
    } catch {
      toast.error("Failed to delete review");
    }
  };

  const renderStars = (rating, onClick = null) => {
    return (
      <div className="star-display">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`star-icon ${star <= rating ? "filled" : ""}`}
            onClick={onClick ? () => onClick(star) : undefined}
            style={{ cursor: onClick ? "pointer" : "default" }}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "numeric"
    });
  };

  return (
    <div className="profile-card">
      <div className="card-header">
        <h2 className="card-title">
          <div className="card-title-icon"><FaStar size={14} /></div>
          My Reviews
        </h2>
        <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
          {!loading && `${reviews.length} review${reviews.length !== 1 ? "s" : ""}`}
        </span>
      </div>

      <div className="card-body">
        {loading ? (
          <ReviewSkeleton />
        ) : reviews.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">⭐</div>
            <div className="empty-state-title">No Reviews Submitted</div>
            <p className="empty-state-text">
              Share your experience with services you've booked by leaving reviews.
            </p>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="review-card">
              {editingId === review._id ? (
                /* Edit Mode */
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)" }}>
                      Your Rating:
                    </span>
                    <div style={{ display: "flex", gap: 4 }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className="star-input-btn"
                          style={{
                            color: star <= editRating ? "#f59e0b" : "#d1d5db",
                            background: "none", border: "none", fontSize: 22, cursor: "pointer"
                          }}
                          onClick={() => setEditRating(star)}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    rows="3"
                    className="form-input"
                    placeholder="Update your review content..."
                    disabled={saving}
                  />

                  <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                    <button
                      className="btn btn-outline"
                      onClick={handleCancelEdit}
                      disabled={saving}
                    >
                      <FaTimes size={12} /> Cancel
                    </button>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleSaveEdit(review._id)}
                      disabled={saving}
                    >
                      <FaCheck size={12} /> {saving ? "Saving..." : "Save"}
                    </button>
                  </div>
                </div>
              ) : (
                /* View Mode */
                <>
                  <div className="review-card-header">
                    <div className="review-service-info">
                      <div className="review-service-name">{review.serviceName}</div>
                      <div className="review-provider-name">by {review.providerName}</div>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      {renderStars(review.rating)}
                      <div className="review-date">
                        <FaCalendarAlt size={10} style={{ marginRight: 4, display: "inline" }} />
                        {formatDate(review.createdAt)}
                      </div>
                    </div>
                  </div>

                  <p className="review-text">{review.reviewText}</p>

                  <div className="review-actions">
                    <button
                      className="btn btn-outline"
                      style={{ padding: "6px 12px", fontSize: 12 }}
                      onClick={() => handleStartEdit(review)}
                    >
                      <FaEdit size={11} /> Edit
                    </button>
                    <button
                      className="btn btn-outline"
                      style={{ padding: "6px 12px", fontSize: 12, color: "#ef4444", borderColor: "#fca5a5" }}
                      onClick={() => setDeleteConfirmId(review._id)}
                    >
                      <FaTrash size={11} /> Delete
                    </button>
                  </div>
                </>
              )}

              {/* Confirm Delete overlay for this specific card */}
              {deleteConfirmId === review._id && (
                <div style={{
                  marginTop: 12,
                  padding: 12,
                  background: "#fee2e2",
                  border: "1px solid #fca5a5",
                  borderRadius: "var(--radius-sm)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  animation: "fadeIn 0.2s ease"
                }}>
                  <span style={{ fontSize: 13, color: "#991b1b", fontWeight: 600 }}>
                    Are you sure you want to delete this review?
                  </span>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      className="btn btn-outline"
                      style={{ padding: "4px 10px", fontSize: 11, background: "white" }}
                      onClick={() => setDeleteConfirmId(null)}
                    >
                      No
                    </button>
                    <button
                      className="btn btn-primary"
                      style={{ padding: "4px 10px", fontSize: 11, background: "#ef4444" }}
                      onClick={() => handleDelete(review._id)}
                    >
                      Yes, Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reviews;