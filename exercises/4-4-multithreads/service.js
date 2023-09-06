function sqr(array) {
    return array.map((x) => (Math.random() > 0.5 ? x * 2 : x / 3)).length;
}

module.exports = { sqr }
