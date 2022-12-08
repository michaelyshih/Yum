import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyReviews, fetchOfMeReviews, deleteReview } from "../../../store/reviews";
// import EventForm from "./EventForm";
import "./myPosts.css";
import ReviewForm from "./ReviewForm";

export default function MyReviews({ setTab, setUserModal, type }) {
  const dispatch = useDispatch();
  const userReviews = useSelector((state) =>
    state.reviews ? Object.values(state.reviews.all) : []
  );
  const userId = useSelector((state) => state.session.user._id);

  useEffect(() => {
    if (type === "MyReviews") {
        dispatch(fetchMyReviews(userId));
    } else {
        dispatch(fetchOfMeReviews(userId))
    }
  }, [dispatch, type]);

  const handleClick = (e, event) => {
//     let newGuestList = event?.guestLists;
//     for (let i = 0; i < newGuestList.length; i++) {
//       newGuestList = newGuestList.filter((guest) => guest._id !== userId);
//     }
//     event.guestLists = newGuestList;
//     dispatch(updateEvent({ event })).then(() =>
//       dispatch(fetchUserEventsAttending(userId))
//     );
  };

  return (
    <div>
      <h1>{type === "MyReviews" ? "Reviews That I've Made" : "Reviews That Others Have Made For Me"}</h1>

      {userReviews?.length === 0 ? (
        <div id="no-events-message">
          <p>{`You do not have any ${
            type === "MyReviews" ? "reviews that you've made" : "reviews that others have made for you"
          } any events`}</p>
        </div>
      ) : (
        userReviews?.map((user) =>{
        return (
            [...user?.guestReviews, ...user?.hostReviews].map((review) => {
            return (
                <div className="user-event" key={review._id}>
                <h1>{review.title}</h1>
                <div className="event-buttons">
                    {type === "MyReviews" ? (
                    <>
                        <button
                        className="edit-event"
                        onClick={() =>
                            setTab(
                            <ReviewForm
                                type={"guest"}
                                kind={"edit"}
                                revieweeId={user._id}
                                setUserModal={setUserModal}
                            />
                            )
                        }
                        >
                        Edit
                        </button>
                        <button
                        className="delete-event"
                        onClick={() => {
                            dispatch(deleteReview(review._id));
                        }}
                        >
                        Delete
                        </button>
                    </>
                    ) : (
                    <button
                        className="edit-event"
                        onClick={(e) => handleClick(e, review)}
                    >
                        Remove
                    </button>
                    )}
                </div>
                </div>
            )})

            )})

    )}
    </div>
  );
}
