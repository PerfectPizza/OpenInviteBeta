import { Link } from 'react-router-dom';

export default ({ event }) => (
  <li key={event._id} className="collection-item">
    <span className="collection-item article-list">
      <Link to={`/event/${event._id}`}>{event.title}</Link>
      <i className="right material-icons small">
        <Link to={`/addEdit/${event._id}`}>mode_edit</Link>
      </i>
      <i
        className="right material-icons small"
        onClick={() => { this.props.deletePost(event._id) }}>
        delete
      </i>
    </span>
  </li>
)