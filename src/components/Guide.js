export default function Guide() {
    return(
        <div className='guide'>
            {/* guide bar */}
          <header>Guide</header>

          {/* guide content */}
          <div className='guide-content'>
            <p className='note'>Note: Always say <strong>"please"</strong> at the end of the voiced instruction because it serves as the <strong>ENTER</strong> key</p>
            <p>When opening a file, you need to say, <strong>“Honey, open new file, please”</strong></p>
            <p>When opening an existing file, you need to say, <strong>“Honey, open the folder, please”</strong></p>
            <p>When saving a file, you need to say, <strong>“Honey, save the file, please”</strong></p>
            <p>When saving as a new file, you need to say, <strong>“Honey, save as new file, please”</strong></p>
            <p>When undoing, you need to say, <strong>“Honey, undo, please”</strong></p>
            <p>When redoing, you need to say, <strong>“Honey, redo, please”</strong></p>
            <p>When cutting, you need to say, <strong>“Honey, cut, please”</strong></p>
            <p>When pasting, you need to say, <strong>“Honey, paste, please”</strong></p>
            <p>When zooming out, you need to say, <strong>“Honey, zoom out, please”</strong></p>
            <p>When zooming in, you need to say, <strong>“Honey, zoom in, please”</strong></p>
            <p>When closing, you need to say, <strong>“Honey, close, please”</strong></p>
          </div>
        </div>
    );
}