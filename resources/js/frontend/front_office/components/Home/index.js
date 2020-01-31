import React from "react";
import { connect } from "react-redux";
import { injectIntl } from "react-intl";
import { Tabs, Icon, Input, Skeleton} from 'antd';
import { clearToken, clearUser } from '../../../libs/utils/auth_utils';
import config from "../../../config"

import './style.local.scss';



const { TabPane } = Tabs;
const { TextArea } = Input;

export default
@injectIntl
@connect((state, props) => ({}))
class Index extends React.Component {
  componentWillMount() {
    document.title = `Accueil | ${config.name}`
  }

  logout(){
    clearToken()
    clearUser()
    window.location.href = "/login"
  }

  inPutonChange(e){
    console.log(e);
  }

  render() {
    // const { formatMessage } = this.props.intl;

    return (
      //<!-- Document Wrapper -->
      <div id="wrapper" className="container-fluid home">
        <div className="">
          <nav className="navbar navbar-expand-lg navbar-dark sticky-top" style={{ backgroundColor: "#3c8cac" }}>
            <div className="container">
              <a className="navbar-brand" href="#">{ config.name }</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <a className="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                  </li>
                </ul>

                <form className="form-inline my-2 my-lg-0">
                  <input className="form-control mr-sm-2 navFormInput" type="search" placeholder="Search" aria-label="Search" />
                  <button className="btn btn-outline-light my-2 my-sm-0" type="submit">Search</button>
                </form>
                
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Profile
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <a className="dropdown-item" href="#">Action</a>
                      <a className="dropdown-item" href="#">Another action</a>
                      <div className="dropdown-divider"></div>
                      <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#" onClick={ () => this.logout() }>Déconnecter</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>

        <div className="container-fluid homeBody">
          <div className="row">
            <div className="col-xs-12 col-md-3 leftNavWrapper"></div>

            <div className="col-xs-12 col-sm-12 col-md-6 feedWrapper">
              <div className="card publication">
                <Tabs defaultActiveKey="1">
                  <TabPane
                    tab={
                      <span>
                        <i className="fa fa-"></i>
                        Publication
                      </span>
                    }
                    key="1"
                  >
                    <TextArea placeholder="Exprimez votre mood du moment..." allowClear onChange={this.inPutonChange} rows={4} />
                    <div className="pubButtonWrapper">
                      <button className="btn btn-primary">Publier</button> &nbsp;
                      <button className="btn btn-light">Annuler</button>
                    </div>   
                  </TabPane>
                  <TabPane
                    tab={
                      <span>
                        <Icon type="android" />
                        Status
                      </span>
                    }
                    key="2"
                  >
                    <TextArea placeholder="Text ou media..." allowClear onChange={this.inPutonChange} rows={4} />
                    <div className="pubButtonWrapper">
                      <button className="btn btn-success">Envoyer</button> &nbsp;
                      <button className="btn btn-secondary">param</button>&nbsp;
                      <button className="btn btn-light">Annuler</button>
                    </div>  
                  </TabPane>

                  <TabPane
                    tab={
                      <span>
                        <Icon type="android" />
                        Vote
                      </span>
                    }
                    key="3"
                  >
                    <Skeleton active paragraph={{ rows: 1 }} />
                    <div className="pubButtonWrapper">
                      <button className="btn btn-primary">soumettre</button> &nbsp;
                      <button className="btn btn-light">Annuler</button>
                    </div>  
                  </TabPane>
                </Tabs> 
              </div>

              <div className="pubLishtFeed">
                <div className="card pubListFeedItem">
                  <Skeleton active avatar paragraph={{ rows: 4 }} />
                </div>
                <div className="card pubListFeedItem">
                  <Skeleton active avatar paragraph={{ rows: 4 }} />
                </div>
                <div className="card pubListFeedItem">
                  <Skeleton active avatar paragraph={{ rows: 4 }} />
                </div>
                <div className="card pubListFeedItem">
                  <Skeleton active avatar paragraph={{ rows: 4 }} />
                </div>
              </div>

            </div>

            <div className="col-xs-12 col-md-3 rightNavWrapper"></div>
          </div>
        </div>

        {/* <div id="back-to-top" className="backtop">
          <i className="fa fa-long-arrow-up" />
        </div> */}
      </div>
    );
  }
}
