import React, { Component } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './style.css';

/* creating variables to store each font for usage in the editor */
var fontFormat = '';
const fontFormats = [
    'Andale Mono=andale mono,times;', 'Arial=arial,helvetica,sans-serif;', 'Arial Black=arial black,avant garde;',
    'Book Antiqua=book antiqua,palatino;', 'Comic Sans MS=comic sans ms,sans-serif;', 'Courier New=courier new,courier;',
    'Georgia=georgia,palatino;', 'Helvetica=helvetica;', 'Impact=impact,chicago;', 'Symbol=symbol;',
    'Tahoma=tahoma,arial,helvetica,sans-serif;', 'Terminal=terminal,monaco;', 'Times New Roman=times new roman;',
    'Trebuchet MS=trebuchet ms,geneva;', 'Verdana=verdana,geneva;', 'Webdings=webdings;', 'Wingdings=wingdings,zapf dingbats'
];
for (let i=0; i<fontFormats.length; i++) {
    fontFormat += fontFormats[i];
};
/* creating an array that will contain each color for usage in the editor */
const colorMap = [
    '000000', 'Black', "333333", "Very dark gray", "333300", "Dark olive", "003300", "Dark green", "003366", "Dark azure",
    "000080", "Navy Blue", "993300", "Burnt orange", "333399", "Indigo", "800000", "Maroon", "FF6600", "Orange", "808000", "Olive",
    "008000", "Green", "008080", "Teal", "0000FF", "Blue", "666699", "Grayish blue", "808080", "Gray", "FF0000", "Red",
    "FF9900", "Amber", "99CC00", "Yellow green", "339966", "Sea green", "33CCCC", "Turquoise", "3366FF", "Royal blue",
    "800080", "Purple", "999999", "Medium gray", "FF00FF", "Magenta", "FFCC00", "Gold", "FFFF00", "Yellow", "00FF00", "Lime",
    "00FFFF", "Aqua", "00CCFF", "Sky blue", "993366", "Red violet", "FF99CC", "Pink", "FFCC99", "Peach", "FFFF99", "Light yellow",
    "CCFFCC", "Pale green", "CCFFFF", "Pale cyan", "99CCFF", "Light sky blue", "CC99FF", "Plum", 'FFFFFF', 'White'
];
/* creating variables for each block format to use in the editor */
var blockFormat = '';
const blockFormats = [
    'Paragraph=p;', 'Header 1=h1;', 'Header 2=h2;', 'Header 3=h3;', 'Header 4=h4;','Header 5=h5;','Header 6=h6;', 'Preformatted=pre'
];
for (let i=0; i<blockFormats.length; i++) {
    blockFormat += blockFormats[i];
};
/* creating variables for each font size to use in the editor */
var fontSize = '';
const fontSizes = [
    '8px', ' 10px', ' 11px', ' 12px', ' 14px', ' 16px', ' 18px', ' 24px', ' 36px', ' 48px'
];
for (let i=0; i<fontSizes.length; i++) {
    fontSize += fontSizes[i];
};

class Input extends Component {
    handleEditorChange = (event) => {
        console.log('Content was updated: ' + event.target.getContent());
    };

    render() {
        if (this.props.className === 'textarea') {
            return(
                <div>
                    {/* <textarea
                        name={this.props.name}
                        rows={this.props.rows}
                        cols={this.props.cols}
                        value={this.props.value}
                        onChange={this.props.onChange}
                    /> */}
                    <Editor
                        apiKey='yhp0y04pvnpkc8yzem7g3jm3p1w5b4bscfmm1qs8xo6aijv0'
                        init={{
                            menubar: false,
                            plugins: 'code',
                            toolbar: [
                                'undo redo | fontselect fontsizeselect forecolor backcolor | code',
                                'bold italic underline | alignleft aligncenter alignright alignjustify',
                                'formatselect | bullist numlist | outdent indent'
                            ],
                            width: 500,
                            height: 300,
                            resize: false,
                            browser_spellcheck: true,
                            block_formats: blockFormat,
                            font_formats: fontFormat,
                            fontsize_formats: fontSize,
                            color_map: colorMap,
                        }}
                    />
                </div>
            );
        } else if (this.props.className === 'checkbox') {
            return(
                <input
                    name={this.props.name}
                    type={this.props.type}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    defaultChecked={this.props.default}
                    style={{cursor: "pointer"}}
                />
            );
        } else if (this.props.className === 'input') {
            if (typeof this.props.value != 'undefined') {
                return(
                    <input
                        name={this.props.name}
                        type={this.props.type}
                        size={this.props.size}
                        value={this.props.value}
                        onChange={this.props.onChange}
                    />
                );            
            } else if (typeof this.props.value === 'undefined') {
                return(
                    <input
                        name={this.props.name}
                        type={this.props.type}
                        onChange={this.props.onChange}
                    />
                );
            };
        };
    };
};

export default Input;