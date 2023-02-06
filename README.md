# jupyterlab_sentry

[Sentry](https://sentry.io/) integration for jupyter lab.

Highly customized and crowded jupyter lab environment might face odd behaviors and errors. Error reporting and analysis tools can help us identify and fix errors. Sentry is one of those tools. 



## Requirements

### 0.\*.\*

- JupyterLab >= 3.0

### 1.\*.\*

- JupyterLab >= 4.0

1.* versions are developed and tested with JupyterLab 4.0.0a29.

## Install

To install the extension, execute:

```bash
pip install jupyterlab_sentry
```

### Sentry DSN

We are using [jupyter lab extension settings](https://github.com/jupyterlab/extension-examples/tree/master/settings) for Sentry DSN.
After installation, you can find that `jupyterlab-sentry` settings are available in advanced settings.
However, this setting is only applied to the user who set this value manually.
In most cases, you might want all your users to be reported by sentry.
![제목 없음](https://user-images.githubusercontent.com/4434752/163006492-292a3572-10e1-4fcb-9acf-f0b1116580de.png)

We are using [overrides.json](https://jupyterlab.readthedocs.io/en/stable/user/directories.html#overrides-json). This file can be installed to your node or docker image.

`/<project>/Dockerfile`
``` 
# Choose version whatever you want
FROM jupyter/base-notebook:lab-3.2.9 as base

COPY overrides.json ${CONDA_DIR}/share/jupyter/lab/settings/overrides.json

# ...
```

`/<project>/overrides.json`
```
{
    "jupyterlab-sentry:plugin": {
        "dsn": "https://yourdsn@asdf.ingest.sentry.io/1234"
    }
}
```

## Uninstall

To remove the extension, execute:

```bash
pip uninstall jupyterlab_sentry
```


## Contributing

### Creating Conda Environment

For `0.*.*` versions,
```
conda create -n jupyterlab-ext --override-channels --strict-channel-priority -c conda-forge -c nodefaults jupyterlab=3 cookiecutter nodejs jupyter-packaging git
```

### Development install

Note: You will need NodeJS to build the extension package.

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone the repo to your local environment
# Change directory to the jupyterlab_sentry directory
# Install package in development mode
pip install -e .
# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite
# Rebuild extension Typescript source after making changes
jlpm build
```

You can watch the source directory and run JupyterLab at the same time in different terminals to watch for changes in the extension's source and automatically rebuild the extension.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
jlpm watch
# Run JupyterLab in another terminal
jupyter lab
```

With the watch command running, every saved change will immediately be built locally and available in your running JupyterLab. Refresh JupyterLab to load the change in your browser (you may need to wait several seconds for the extension to be rebuilt).

By default, the `jlpm build` command generates the source maps for this extension to make it easier to debug using the browser dev tools. To also generate source maps for the JupyterLab core extensions, you can run the following command:

```bash
jupyter lab build --minimize=False
```

### Development uninstall

```bash
pip uninstall jupyterlab_sentry
```

In development mode, you will also need to remove the symlink created by `jupyter labextension develop`
command. To find its location, you can run `jupyter labextension list` to figure out where the `labextensions`
folder is located. Then you can remove the symlink named `jupyterlab-sentry` within that folder.

### Packaging the extension

See [RELEASE](RELEASE.md)

### Our problems and goals

In theory, Sentry agent should be initialized as soon as possible. But, jupyter lab extensions are loaded much later. 

Sentry report would be improved if we feed them additional information like user id.

Jupyter lab setting is not bad for deliverying DSN value, but I'm a little worried that users might change their DSN value. It is also a bit complicated to set up `overrides.json`.
