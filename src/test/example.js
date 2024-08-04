export const EXAMPLE_INPUT = `CREATE fruits
CREATE vegetables
CREATE grains
CREATE fruits/apples
CREATE fruits/apples/fuji
LIST
CREATE grains/squash
MOVE grains/squash vegetables
CREATE foods
MOVE grains foods
MOVE fruits foods
MOVE vegetables foods
LIST
DELETE fruits/apples
DELETE foods/fruits/apples
LIST`

export const EXAMPLE_OUTPUT = `fruits
  apples
    fuji
grains
vegetables
foods
  fruits
    apples
      fuji
  grains
  vegetables
    squash
Cannot delete fruits/apples - fruits does not exist
foods
  fruits
  grains
  vegetables
    squash
`
