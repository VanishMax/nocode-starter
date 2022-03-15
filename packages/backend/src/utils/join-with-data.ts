import { ObjectId } from 'mongodb';

const joinWithData = (id: string, field: string, otherCollection: string) => {
  return [
    {
      $match: {
        _id: new ObjectId(id) as unknown as string,
      },
    },
    {
      $lookup: {
        from: otherCollection,
        localField: `${field}._id`,
        foreignField: '_id',
        as: field,
        let: { users: `$${field}` },
        pipeline: [
          {
            $match: {
              $expr: {
                $in: ['$_id', `$$${field}._id`],
              },
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
                    users: {
                      $arrayToObject: {
                        $filter: {
                          input: { $objectToArray: '$$ROOT' },
                          cond: { $ne: ['$$this.k', 'docs'] },
                        },
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
