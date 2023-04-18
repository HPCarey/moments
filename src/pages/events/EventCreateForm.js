import React, { useRef, useState } from "react";
import { Rating } from "react-simple-star-rating";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import Upload from "../../assets/upload.png";

import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Assets";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";

function EventCreateForm() {
  useRedirect("loggedOut");
  const [errors, setErrors] = useState({});
  const [rating, setRating] = useState(0); //set the initial value for the rating

  const [eventData, setEventData] = useState({
    event_title: "",
    event_description: "",
    image: "",
    date: "",
    time: "",
    country: "",
    location: "",
    email: "",
    phone: "",
    difficulty: "",
    rating: "",
  });

  const {
    event_title,
    event_description,
    image,
    date,
    time,
    country,
    location,
    email,
    phone,
    difficulty,
  } = eventData;

  const imageInput = useRef(null);

  const history = useHistory();

  const handleChange = (event) => {
    setEventData({
      ...eventData,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setEventData({
        ...eventData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleRating = (rate) => {
    setRating(rate /10);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("event_title", event_title);
    formData.append("event_description", event_description);
    formData.append("image", imageInput.current.files[0]);
    formData.append("date", date);
    formData.append("time", time);
    formData.append("country", country);
    formData.append("location", location);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("difficulty", difficulty);
    formData.append("rating", rating);

    try {
      const { data } = await axiosReq.post("/events/", formData);
      history.push(`/events/${data.id}`);
    } catch (err) {
      // console.log(err)
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Trail Name</Form.Label>
        <Form.Control
          type="text"
          name="event_title"
          value={event_title}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.event_title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Trail description</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="event_description"
          value={event_description}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.event_description?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Row className={styles.RowSpacing}>
        <Form.Group>
          <Form.Label>Country:</Form.Label>
          <Form.Control
            type="text"
            name="country"
            value={country}
            onChange={handleChange}
            aria-label="country"
          />
        </Form.Group>
        {errors?.country?.map((message, idx) => (
          <Alert variant="danger" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group>
          <Form.Label>Location:</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={location}
            onChange={handleChange}
            aria-label="location"
          />
        </Form.Group>
        {errors?.location?.map((message, idx) => (
          <Alert variant="danger" key={idx}>
            {message}
          </Alert>
        ))}
      </Row>

      <Row className={styles.RowSpacing}>
        <Form.Group>
          <Form.Label>Date:</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={date}
            onChange={handleChange}
            aria-label="date"
          />
        </Form.Group>
        {errors?.date?.map((message, idx) => (
          <Alert variant="danger" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group>
          <Form.Label>Time:</Form.Label>
          <Form.Control
            type="time"
            name="time"
            value={time}
            onChange={handleChange}
            aria-label="time"
          />
        </Form.Group>
        {errors?.time?.map((message, idx) => (
          <Alert variant="danger" key={idx}>
            {message}
          </Alert>
        ))}

        <Form.Group>
          <Form.Label>Phone:</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={phone}
            onChange={handleChange}
            aria-label="phone"
          />
        </Form.Group>
        {errors?.phone?.map((message, idx) => (
          <Alert variant="danger" key={idx}>
            {message}
          </Alert>
        ))}
      </Row>

      <Form.Group>
        <Form.Label>Trail difficulty:</Form.Label>
        <Form.Control
          type="int"
          name="difficulty"
          value={difficulty}
          onChange={handleChange}
          aria-label="difficulty"
        />
      </Form.Group>
      {errors?.difficulty?.map((message, idx) => (
        <Alert variant="danger" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Rate this trail:</Form.Label>
        <Rating onClick={handleRating} /* Available Props */ />
      </Form.Group>
      {errors?.difficulty?.map((message, idx) => (
        <Alert variant="danger" key={idx}>
          {message}
        </Alert>
      ))}

      <br />

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        create
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.EventImage} src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                      htmlFor="image-upload"
                    >
                      Change the Image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset src={Upload} message="Click or tap to upload image" />
                </Form.Label>
              )}

              <Form.File
                id="image-upload"
                accept="image/"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default EventCreateForm;
