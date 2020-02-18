import React, {useEffect} from 'react';
const remote = require('electron').remote;
const miniImage = remote.require('./image-min');
import './index.less';

const Main = () => {
  // 创建组件引用
  let dropRef = React.createRef();

  const handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragOut = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = async e => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // props.handleDrop(e.dataTransfer.files[0]);
      console.log(e.dataTransfer.files);
      const result = await miniImage(e.dataTransfer.files);
      if(result){
        console.log('压缩成功');
      }
    }
  };

  const handleChangeFile = async e => {
    console.log(e.target.files);
    const result = miniImage(e.target.files);
    if(result){
      console.log('压缩成功');
    }
  };

  useEffect(() => {
    // 监听拖放事件
    let div = dropRef.current;
    div.addEventListener("dragenter", handleDragIn);
    div.addEventListener("dragleave", handleDragOut);
    div.addEventListener("dragover", handleDrag);
    div.addEventListener("drop", handleDrop);
    // 销毁时移除事件
    return function cleanup() {
      div.removeEventListener("dragenter", handleDragIn);
      div.removeEventListener("dragleave", handleDragOut);
      div.removeEventListener("dragover", handleDrag);
      div.removeEventListener("drop", handleDrop);
    };
  });
  return <div>
    <div ref={dropRef} className="box">
      <div className="panada">
        <img src={__static+'/images/panda.png'} />
      </div>
      <div className="grass">
        <img src={__static+'/images/grass.png'} />
      </div>
      <div className="bamboo">
        <img src={__static+'/images/bamboo.png'} />
      </div>
      <div className="tip">
        <img src={__static+'/images/download.png'} />
        <p>Drop your .png or .jpg files here!</p>
      </div>
      <input className="upload" multiple type="file" onChange={handleChangeFile} />
    </div>
  </div>;
};

export default Main;