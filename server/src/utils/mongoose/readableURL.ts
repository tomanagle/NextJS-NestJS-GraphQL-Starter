function readableURL(schema, options) {
  const path = 'permalink';
  schema.path(path, {});

  schema.pre('validate', function(next) {
    const actualValue = this.get(path);

    if (actualValue && !this.isNew && !this.isModified(path)) {
      return next();
    }

    const permalink =
      actualValue ||
      String(this[options.source])
        .replace(/ /g, '-')
        .toLowerCase();

    this.set(path, permalink);
    next();
  });
}

export default readableURL;
