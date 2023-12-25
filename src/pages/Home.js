import homeImg from "../assets/images/what-is-a-home-page.jpg" 
import "./Home.scss"
const Home = () => {
  return (
    <div className="wrapper">
        <h1>Xin chào, đây là trang chủ!</h1>
        <p>Chào mừng bạn đến với trang web của chúng tôi.</p>
        <img src={homeImg} className="home-img" alt="homepage" />
      </div>
  )
}

export default Home