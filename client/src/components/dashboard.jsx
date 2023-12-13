import React, { Component } from "react";
import { Link } from "react-router-dom";
import Pagination from "./common/pagination";
import ListGroup from "./listgroup";
import Posts from "./posts";
import { paginate } from "../utils/paginate";
import { api } from "../config.js";
import http from "../services/httpService";
import Jumotron from "./common/jumbotron";
import DropdownMenu from "./DropdownMenu";
import ads from "../ad.jpg";

class Dashboard extends Component {
  state = {
    allposts: [],
    currentPage: 1,
    pageSize: 4,
    tags: [],
    selectedTag: { _id: "1", name: "All Posts" },
  };
  async componentDidMount() {
    const { data: allposts } = await http.get(api.postsEndPoint);
    const { data: tags } = await http.get(api.tagsEndPoint);
    allposts.sort((a, b) => {
      return new Date(b.time) - new Date(a.time);
    });
    console.log(allposts);

    this.setState({
      allposts: [...allposts],
      tags: [
        {
          _id: "1",
          name: "All Posts",
        },
        ...tags,
      ],
    });
  }
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handlePostDelete = (post) => {};
  handleTagSelect = (tag) => {
    this.setState({ selectedTag: tag, currentPage: 1 });
  };
  getPosts() {
    const { allposts, selectedTag } = this.state;
    const filtered = [];
    for (let i in allposts) {
      const post = allposts[i];
      const { tags } = post;
      for (let j in tags) {
        if (tags[j].name === selectedTag.name) {
          filtered.push(post);
          break;
        }
      }
    }
    console.log(filtered);
    return filtered;
  }

  render() {
    const { user } = this.props;
    // const { user } = localStorage.getItem("user");
    console.log("user is ", { user });
    const { allposts, pageSize, currentPage, tags, selectedTag } = this.state;
    const filtered = selectedTag._id === "1" ? allposts : this.getPosts();
    const posts = paginate(filtered, currentPage, pageSize);
    const handleSortChange = (sort) => {
      console.log(sort);
      // const {allposts} = this.state;
      if (sort === "oldest") {
        allposts.sort((a, b) => {
          return new Date(a.time) - new Date(b.time);
        });
      } else if (sort === "popular") {
        allposts.sort((a, b) => {
          return b.views - a.views;
        });
      } else {
        allposts.sort((a, b) => {
          return new Date(b.time) - new Date(a.time);
        });
      }
      this.setState({
        allposts: [...allposts],
      });
    };
    // if (allposts.length === 0) {
    //   return (
    //     <div>
    //       <p style={{ color: "rgba(103,105,109,255)" }}>
    //         There are no posts in the database!
    //       </p>
    //       {
    //         <Link to="/new-post">
    //           <button
    //             type="button"
    //             className="btn btn-success"
    //             style={{ marginBottom: 20 }}
    //           >
    //             New Post
    //           </button>
    //         </Link>
    //       }
    //     </div>
    //   );
    // }
    return allposts.length === 0 ? (
      <div>
        <p style={{ color: "rgba(103,105,109,255)" }}>
          There are no posts in the database!
        </p>
        {
          <Link to="/new-post">
            <button
              type="button"
              className="btn btn-success"
              style={{ marginBottom: 20 }}
            >
              New Post
            </button>
          </Link>
        }
      </div>
    ) : (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-sm-8 px-3">
              <Jumotron />
              <div className="sortAndPost">
                <div className="d-flex w-100 justify-content-between align-items-center">
                  <div
                    className="p-3"
                    style={{ color: "rgba(103,105,109,255)" }}
                  >
                    Showing {filtered.length} posts.
                    <DropdownMenu onChange={handleSortChange} />
                  </div>
                  {user && (
                    <div className="p-3">
                      <Link to="/new-post">
                        <button
                          type="button"
                          className="btn"
                          style={{
                            backgroundColor: "white",
                            color: "rgba(162,115,255,255)",
                          }}
                        >
                          New Post
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
              <div style={{ backgroundColor: "rgba(239,239,239,255)" }}>
                <Posts
                  posts={posts}
                  user={user}
                  onDelete={this.handlePostDelete}
                />
              </div>
              {/* <Posts posts={posts} user={user} onDelete={this.handlePostDelete} /> */}
            </div>
            <div
              className="col-sm-3 mx-3"
              style={{
                backgroundColor: "rgba(167,164,245,255)",
                borderRadius: "10px",
              }}
            >
              <div
                className="ads mx-2 my-4"
                style={{
                  backgroundColor: "rgba(240,242,245,255)",
                  borderRadius: "5px",
                }}
              >
                <div className="m-1" style={{ color: "rgba(103,105,109,255)" }}>
                  scoutfitters
                </div>
                <div>
                  <a href="https://www.instagram.com/p/Cy9DHZMvZgy/">
                    <img
                      src={ads}
                      alt="ads"
                      style={{
                        height: "100%",
                        width: "100%",
                        borderRadius: "5px",
                      }}
                    />
                  </a>
                </div>
              </div>
              <div className="mx-2 my-4">
                {" "}
                <ListGroup
                  items={tags}
                  selectedTag={this.state.selectedTag}
                  onTagSelect={this.handleTagSelect}
                />
              </div>
            </div>
            <Pagination
              itemCount={filtered.length}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
    // return (
    //   <React.Fragment>
    //     <div className="container">
    //       <div className="row">
    //         <div className="col-sm-8 px-3">
    //           <Jumotron />
    //           <div className="sortAndPost">
    //             <div className="d-flex w-100 justify-content-between align-items-center">
    //               <div
    //                 className="p-3"
    //                 style={{ color: "rgba(103,105,109,255)" }}
    //               >
    //                 Showing {filtered.length} posts.
    //                 <DropdownMenu onChange={handleSortChange} />
    //               </div>
    //               {user && (
    //                 <div className="p-3">
    //                   <Link to="/new-post">
    //                     <button
    //                       type="button"
    //                       className="btn"
    //                       style={{
    //                         backgroundColor: "white",
    //                         color: "rgba(162,115,255,255)",
    //                       }}
    //                     >
    //                       New Post
    //                     </button>
    //                   </Link>
    //                 </div>
    //               )}
    //             </div>
    //           </div>
    //           <div style={{ backgroundColor: "rgba(239,239,239,255)" }}>
    //             <Posts
    //               posts={posts}
    //               user={user}
    //               onDelete={this.handlePostDelete}
    //             />
    //           </div>
    //           {/* <Posts posts={posts} user={user} onDelete={this.handlePostDelete} /> */}
    //         </div>
    //         <div
    //           className="col-sm-3 mx-3"
    //           style={{
    //             backgroundColor: "rgba(167,164,245,255)",
    //             borderRadius: "10px",
    //           }}
    //         >
    //           <div
    //             className="ads mx-2 my-4"
    //             style={{
    //               backgroundColor: "rgba(240,242,245,255)",
    //               borderRadius: "5px",
    //             }}
    //           >
    //             <div className="m-1" style={{ color: "rgba(103,105,109,255)" }}>
    //               Sponsored
    //             </div>
    //             <div>
    //               <img
    //                 src={ads}
    //                 alt="ads"
    //                 style={{
    //                   height: "100%",
    //                   width: "100%",
    //                   borderRadius: "5px",
    //                 }}
    //               />
    //             </div>
    //           </div>
    //           <div className="mx-2 my-4">
    //             {" "}
    //             <ListGroup
    //               items={tags}
    //               selectedTag={this.state.selectedTag}
    //               onTagSelect={this.handleTagSelect}
    //             />
    //           </div>
    //         </div>
    //         <Pagination
    //           itemCount={filtered.length}
    //           pageSize={pageSize}
    //           currentPage={currentPage}
    //           onPageChange={this.handlePageChange}
    //         />
    //       </div>
    //     </div>
    //   </React.Fragment>
    // );
  }
}

export default Dashboard;
