# Docker Nunjucks

Easier print logs to desired format.

## How to Use

* Stdout

  * Use json option:

    ```bash
    $ docker run --rm \
        chrischu/nunjucks:latest \
        --json '{"hello": "world"}'
    ```

  * Pipe from host into container:

    ```bash
    $ cat script/package.json | docker run --rm -i \
        chrischu/nunjucks:latest \
        --format json
    ```

* Files

  * Mount volume with your needs:

    ```
    + /templates/<FORMAT>.njk ...... templates
    + /parsers/<FORMAT>.js ......... [TBD] parsers
    + /export/ ..................... [TBD] Directory to save output files
    ```

  * Specific filename by options:

    ```bash
    $ docker run --rm \
        -v $PWD:/exports
        chrischu/nunjucks:latest \
        --output /exports/index.html
        'Hello, world'

    $ cat index.html
    <!DOCTYPE html>
    ...
    ```

## References

[Nunjucks](https://mozilla.github.io/nunjucks/)
