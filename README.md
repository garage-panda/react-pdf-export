[![npm version](https://badge.fury.io/js/@garage-panda%2Freact-pdf-export.svg)](https://badge.fury.io/js/@garage-panda%2Freact-pdf-export)

# react-pdf-export

## About

It allows you to either download or print a pdf file with your own content.

## Example

[Example code in stackblitz](https://stackblitz.com/edit/react-enpvi5?file=src%2FApp.js)

## Installation

```
// with npm

npm i @garage-panda/react-pdf-export

// with yarn

yarn add @garage-panda/react-pdf-export
```

Import the package

```typescript
import { PdfExport, useGeneratePdf } from "@garage-panda/react-pdf-export";
```

Retrieve the component and the useEffect

```typescript
const { generatePdf, containerRef } = useGeneratePdf();
```

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

        <button onClick={generatePdf}>Generate PDF</button>
      </React.Fragment>
    );
}

export default App;
```

### Available optional props

| Prop      | Type        | Default                                                | Description                                                                                                                                                                                      | Optional |
| --------- | ----------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| className | string      | none                                                   | A custom class passed down to the iframe container                                                                                                                                               | yes      |
| showInDom | boolean     | true                                                   | Show the preview of the PDF in the DOM                                                                                                                                                           | yes      |
| lazyLoad  | boolean     | false                                                  | In the lazy load mode the content of the PDF is added to the DOM when you call generatePdf and is cleared afterwards. In non-lazy load the content is added to the DOM when the page is rendered | yes      |
| options   | HeadOptions | { styles: [], scripts: [], includeParentStyles: true } | Styles and scripts loaded only in the iframe                                                                                                                                                     | yes      |

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Support

If you like what you see, feel free to support us!

<a href="https://www.buymeacoffee.com/garage.panda">
<img src="https://img.buymeacoffee.com/button-api/?text=Buy us a beer&emoji=:beer:&slug=garage.panda&button_colour=FFDD00&font_colour=000000&font_family=Poppins&outline_colour=000000&coffee_colour=ffffff"></a>

## License

[MIT](https://choosealicense.com/licenses/mit/)
