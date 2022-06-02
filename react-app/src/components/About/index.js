import "./index.css";

const About = () => {
    return (
        <>
            <div className="developers-container">
                <h1>For devs, by devs</h1>
                <p>
                    Esena is a project management app where users can create, view, update and delete a project and tasks
                </p>
                <div className="inner-dev-container">
                    <div className="dev-profile">
                        <img className="dev-img" src="https://user-images.githubusercontent.com/92604480/171740072-78640cb3-f7e2-4539-bc85-7a813440d9be.png"></img>
                        <h3 className="dev-name">Ethan Chen</h3>
                        <h4 className="dev-area">California</h4>
                        <a href="https://github.com/ethanchen7">GitHub</a>
                    </div>
                    <div className="dev-profile">
                        <img className="dev-img" src="https://user-images.githubusercontent.com/92604480/171740072-78640cb3-f7e2-4539-bc85-7a813440d9be.png"></img>
                        <h3 className="dev-name">Lana Komar</h3>
                        <h4 className="dev-area">California</h4>
                        <a href="https://github.com/lanakomar">GitHub</a>
                    </div>
                    <div className="dev-profile">
                        <img className="dev-img" src="https://user-images.githubusercontent.com/92604480/171740072-78640cb3-f7e2-4539-bc85-7a813440d9be.png"></img>
                        <h3 className="dev-name">Vee Alianza</h3>
                        <h4 className="dev-area">Utah</h4>
                        <a href="https://github.com/vee-alianza">GitHub</a>
                    </div>
                    <div className="dev-profile">
                        <img className="dev-img" src="https://user-images.githubusercontent.com/92604480/171740072-78640cb3-f7e2-4539-bc85-7a813440d9be.png"></img>
                        <h3 className="dev-name">Xiaowen Nie</h3>
                        <h4 className="dev-area">California</h4>
                        <a href="https://github.com/xwnnie">GitHub</a>
                    </div>
                </div>


            </div>
        </>
    )
}

export default About;
