const joinWithData = (field: string, otherCollection: string) => {
  return [
    {
      $lookup: {
        from: otherCollection,
        as: field,
        let: { [field]: `$${field}` },
        pipeline: [
          {
            $match: {
              $expr: { $in: ['$_id', `$$${field}._id`] },
            },
          },
          {
            $addFields: {
              docs: {
                $filter: {
                  input: `$$${field}`,
                  cond: {
                    $eq: ['$$this._id', '$_id'],
                  },
                },
              },
            },
          },
          { $unwind: '$docs' },
          {
            $replaceRoot: {
              newRoot: {
                $mergeObjects: [
                  '$docs',
                  {
                    $arrayToObject: {
                      $filter: {
                        input: { $objectToArray: '$$ROOT' },
                        cond: { $ne: ['$$this.k', 'docs'] },
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    },
  ];
};

export default joinWithData;
