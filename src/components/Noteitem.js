import React from 'react'

export default function Noteitem(props) {
    const {note} = props;
  return (
    <div className="col-md-3">
      {/* {note.title + " "}
      {note.tag + " "}
      {note.description}; */}
      <div className="card border-success mb-3" style={{"max-width": "18rem"}}>
        <div className="card-header bg-transparent border-success">{note.title}</div>
        <div className="card-body text-success">
            <h5 className="card-title"></h5>
            <p className="card-text">{note.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias quae, libero aperiam vero quo ipsa maiores, officiis inventore tempore repellat reprehenderit a expedita optio repudiandae at laudantium dicta harum dolor facere! Ipsa velit autem, reprehenderit officiis maxime maiores mollitia aliquid accusantium cumque nesciunt dicta esse quidem odio ratione eligendi officia.</p>
        </div>
        <div className="card-footer bg-transparent border-success">{note.tag}</div>
        </div>
    </div>
  )
}
