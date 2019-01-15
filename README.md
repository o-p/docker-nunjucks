# Docker Nunjucks

## Usage

Simplest way, use json option.

```bash
$ docker run --rm \
    $IMAGE:latest \
    --json '{"hello": "world"}'
```

Pipe stdin, it might useful if you are handling a more complex content.

```bash
$ cat yourfile.tsv | docker run -i --rm \
    $IMAGE:latest \
    --format 'tsv'
```

Provide your templates

```bash
$ echo '<span>{{ raw }}</span>' > file.html
$ docker run --rm \
    -v file.html:/templates/example.njk
    $IMAGE:latest
    --format plain-text
    --data 'Hello, world'
```

## Build

## References

[Nunjucks](https://mozilla.github.io/nunjucks/)
