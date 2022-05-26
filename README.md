# HEAD

`head [-n lines | -c bytes] [file ...]`
```
head file ->  
   The head utility will display first count lines of each of specified files. By default line count is 10.

head -n lines file ->  
   This filter displays the specified number of lines of each of the specified files.

head -c bytes file ->  
  This filter displays the specified number of bytes of each of the specified files.
  
```

# TAIL

`tail [-c # | -n #][-r][-q] [file ...]`

```
tail file ->
   display the last part of a file,By default the line coount is 10.

tail -n lines file -> 
   display specified number of lines from last.

tail -c bytes file -> 
   display specified number of bytes from last.

tail -r file ->
    The -r option causes the input to be displayed in reverse order, by line. The default for the
   -r option is to display all of the input.

tail -q file->
   Suppresses printing of headers when multiple files are being examined   