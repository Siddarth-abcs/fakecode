import { Link } from 'react-router-dom';
import { useSelector} from 'react-redux/es/hooks/useSelector';
import './Navbar.css'
import { useDispatch } from 'react-redux';
import { signOutUser } from '../../../redux/actionCreators/authActionCreater';


function Navbar() {
  
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();




  return (
    <nav>
      {/* <div className="container-a">

        <div className="logo-a">
          <div className="img-a"><img src="https://lh4.googleusercontent.com/5w3beExKwQp5HlTvWUatWSmlKRAl9kwnZIzih5XE9fICiq-0bXa3JK_p6nV4fpi1EzqcD7G4jULcjqy9igl0wOI=w16383" className='narbariya-logo'/></div>
        </div>

       <div className="link-a">
          <div className='btnlinks-a linksa-a'>Project</div>
          <div className='btnlinks-a'>Services</div>
          <div className='btnlinks-a'>About us</div>
          <div className='btnlinks-a'>Contact</div>
        </div> 

        <div className="btns-a">
          <Link to="/" className='btn btn-outline-primary fw-bold' style={{marginRight:"1rem"}}>Home</Link>
          <Link to="/" className='btn btn-outline-primary bg-primary text-light fw-bold' onClick={ () => dispatch(signOutUser())}>Logout</Link>
        </div>
      </div> */}

     <header>
     <div className="container-nav">
        <div className="logo">
        <div className="img"><img src="https://firebasestorage.googleapis.com/v0/b/project-93474.appspot.com/o/Logo.png?alt=media&token=0552e921-8246-4145-93ce-7ef1adebec1c" className='narbariya-logo'/></div>
          <p>Web Accesss</p>
        </div>
        <div className="btns">

          <div className="links">
          <li className='btnlinks linksa'><a href="https://www.narbariya.rf.gd/narbariya" target='_blank'>Project</a></li>
          <li className='btnlinks'><a href="https://www.narbariya.rf.gd/services" target='_blank'>Services</a></li>
          <li className='btnlinks'><a href="https://www.narbariya.rf.gd/about-us" target='_blank'>About us</a></li>
          <li className='btnlinks'><a href="https://www.narbariya.rf.gd/contact" target='_blank'>Contact</a></li>
          </div>

        <div className="logout">
        <Link to="/" className='btn btn-outline-primary bg-primary text-light fw-bold' onClick={ () => dispatch(signOutUser())}>Logout</Link>
        </div>
        </div>
      </div>
     </header>
    </nav>
    
  )
}

export default Navbar;
