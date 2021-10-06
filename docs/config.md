### config.mjs

This file contains all customizable options. It must export `template` and `templateDeafult` functions.

`symbols`, `colors`, `meta`, and `terminal` are optional.



-----

### template / templateDefault

Use the `template` function to create a personal template for yourself. Use `templateDefault` to create a generic template for all users.

Available functions inside the template function (first argument)



##### ascii(import.meta.url, "./path/to/ascii.art")

Draw the ascii art from file. The path is relative to this config file

```js
ascii(imports.meta.url, "./path/to/ascii-art")
```



##### title(string)

Displays the string in bold, primary color

```js
title("Your Username ...")
```



##### underline()

Underlines the previous line

```js
underline()
```



##### info(string, string)

Display a key-value pair

```js
info("Twitter", "@whatever")
```



##### list(string, string[])

Display an unordered list

```js
list("Languages", ["JavaScript", "Python"])
```



##### text(string)

Insert plain text

```js
text("Elit enim officia veniam minim ullamco aute culpa qui esse occaecat Lorem ut pariatur eiusmod.")
```



##### bar(string, number)

> not yet implemented

```js
bar("idk", 85)
```



##### blank()

Insert a blank line

```js
blank()
```



##### raw(string)

Use Chalk`s tagged template syntax to colorize the output

```js
raw("Hello {green World}!")
```



##### left()

Switch to the left column

```js
left()
```



##### right()

Switch to the right column

```js
right()
```



#### variables

The second argument to the template function. To see the complete list run `userfetch -debug`

`username`, `name`, `email`, `location`, `bio`, `status`, `followers`, `following`, `sponsors`, `sponsoring`, `gists`, `organizations`, `contributedTo`, `packages`, `projects`, `pullRequests`, `issues`, `starred`, `commits`, `repositories` ...



-----

### colors

This is an optional export. It can have `primary`, `secondary`, `tertiary`, `alternate` keys. The possible color values are `"black"`, `"red"`, `"green"`, `"yellow"`, `"blue"`, `"magenta"`, `"cyan"`, `"white"`, `"blackBright"`, `"redBright"`, `"greenBright"`, `"yellowBright"`, `"blueBright"`, `"magentaBright"`, `"cyanBright"`, `"whiteBright"`
##### primary

Used in titles and info key

##### secondary

Used in text, list text, info value

##### tertiary

Used to color symbols like bullets and underline

##### alternate

Used to color the ascii art



-----

### symbols

##### underline
##### infoSeparator
##### listMarker



-----

### terminal

This is an optional export. These color values will be used to colorize the SVG output.

> not yet implemented

##### background

background color of the terminal

##### black / red / green / yellow / blue / magenta / cyan / white

##### blackBright / redBright / greenBright / yellowBright / blueBright / magentaBright / cyanBright / whiteBright