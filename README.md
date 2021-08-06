# Important

The package is under development and this is the Alpha version of it. Stay still, we are doing our best to finish it soon.

## react-pdf-export

A PDF generator for React applications.

## About

It allows you to either download or print a pdf file with your own content.

## Example

[Example code in stackblitz](https://stackblitz.com/edit/react-enpvi5?file=src%2FApp.js)

## Installation

Run

`npm i @garage-panda/react-pdf-export`

Import the package

`import { PdfExport, useGeneratePdf } from '@garage-panda/react-pdf-export';`

Retrieve the component and the useEffect

`const { generatePdf, containerRef } = useGeneratePdf();`

That's it!

## Usage

```JSX
import { PdfExport, useGeneratePdf } from '@garage-panda/react-pdf-export';

const App() {
    const { generatePdf, containerRef } = useGeneratePdf();

    return (
      <React.Fragment>
      <PdfExport containerRef={containerRef}>
        <h1>This is the content of the PDF in here</h1>
        <div>
          <p>Yes, you can put any child</p>
          <div>Because it's awesome!</div>
        </div>
      </PdfExport>
      <br />
      <button onClick={generatePdf}>Generate PDF</button>
    </React.Fragment>
    );
}

export default App;
```

### Available optional props

| Prop      | Type        | Default                                                | Description                                                                                                                                                                                      | Optional |
|-----------|-------------|--------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|
| className | string      | none                                                   | A custom class passed down to the iframe container                                                                                                                                               | yes      |
| showInDom | boolean     | true                                                   | Show the preview of the PDF in the DOM                                                                                                                                                           | yes      |
| lazyLoad  | boolean     | false                                                  | In the lazy load mode the content of the PDF is added to the DOM when you call generatePdf and is cleared afterwards. In non-lazy load the content is added to the DOM when the page is rendered | yes      |
| options   | HeadOptions | { styles: [], scripts: [], includeParentStyles: true } | Styles and scripts loaded only in the iframe                                                                                                                                                     | yes      |


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)