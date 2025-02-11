import React, { Component } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
class MyApp extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
    wdith: 600
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  onChange = (pageNumber) => {
    this.setState({pageNumber})
  }

  getAllPages = () => {
    const { numPages, width } = this.state;
    const pages = [];
    if (numPages !== null) {
        for (let i = 1; i <= numPages; i++) {
            pages.push(<Page width={width} pageNumber={i} renderTextLayer={false} />);
        }
    }
    return pages;
  }

  render() {
    return (
      <div id="pdf-reader" style={{height: '600px', overflowY: 'auto'}}>
        <Document
          file={this.props.src}
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          {
              this.getAllPages()
          }
        </Document>
      </div>
    );
  }
  componentDidMount () {
    const container = document.getElementById('pdf-reader');
    const width = parseInt(window.getComputedStyle(container).getPropertyValue('width').slice(0, -2), 10);
    this.setState({
        width: width - 10
    })
  }
}

export default MyApp;
