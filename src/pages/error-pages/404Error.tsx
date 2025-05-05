import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/error-pages/style.css';

const Error404: React.FC = () => {
  useEffect(() => {
    // Thêm Bootstrap và font Arvo dynamically
    const bootstrapLink = document.createElement('link');
    bootstrapLink.rel = 'stylesheet';
    bootstrapLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css';
    document.head.appendChild(bootstrapLink);

    const arvoLink = document.createElement('link');
    arvoLink.rel = 'stylesheet';
    arvoLink.href = 'https://fonts.googleapis.com/css?family=Arvo';
    document.head.appendChild(arvoLink);

    // Cleanup khi component unmount
    return () => {
      document.head.removeChild(bootstrapLink);
      document.head.removeChild(arvoLink);
    };
  }, []);

  return (
    <section className="page_404">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="col-sm-10 col-sm-offset-1 text-center">
              <div className="four_zero_four_bg">
                <h1 className="text-center">404</h1>
              </div>

              <div className="contant_box_404">
                <h3 className="h2">Look like you're lost</h3>
                <p>the page you are looking for not avaible!</p>
                <Link to="/dashboard" className="link_404">
                  Go to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Error404;
