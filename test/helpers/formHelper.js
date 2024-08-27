async function fillForm(fields) {
  for (const [selector, value] of Object.entries(fields)) {
    const field = await $(selector);
    await field.setValue(value);
  }
}

module.exports = { fillForm };
