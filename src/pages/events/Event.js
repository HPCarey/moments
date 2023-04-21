import React from "react";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import { Link, useHistory } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import Avatar from "../../components/Avatar";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/Post.module.css";
import { Rating } from "react-simple-star-rating";

const Event = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    event_title,
    event_description,
    image,
    updated_at,
    date,
    time,
    country,
    location,
    email,
    phone,
    difficulty,
    rating,
    created_on,
    eventPage,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/events/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/events/${id}/`);
      history.goBack();
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <Card className={styles.Post}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && eventPage && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/events/${id}`}>
        <Card.Img src={image} alt={event_title} />
      </Link>
      <Card.Body>
        {event_title && (
          <Card.Title className="text-center">{event_title}</Card.Title>
        )}
        {event_description && <Card.Text>{event_description}</Card.Text>}
        <div className={styles.PostBar}>
          <p>
            Date: {date} | Time: {time}
          </p>
          <p>
            Location: {location}, {country}
          </p>
          <p>
            email: {email}, | phone: {phone}
          </p>
          <p>difficulty: {difficulty}</p>
          <p>
            Rating:  <Rating readonly initialValue={rating} size={25} />
          </p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Event;
