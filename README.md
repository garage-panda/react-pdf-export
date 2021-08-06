# Important

The package is under development and this is the Alpha version of it. Stay still, we are doing our best to finish it soon.

## react-pdf-export

A PDF generator for React applications.

## About

It allows you to either download or print a pdf file with your own content.

## Example

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
        <button onClick={generatePdf}>Click me</button>
        <PdfExport containerRef={containerRef} options={{
          styles: ['https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css'],
          scripts: ['https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js']
        }}>
          <h1>This is the content of the PDF in here</h1>
          <p>Yes, you can put any child</p>
          <div>Because it's awesome!</div>
        </PdfExport>
      </React.Fragment>
    );
}

export default App;
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)