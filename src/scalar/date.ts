import { Scalar } from '@nestjs/graphql';
import { Kind } from 'graphql';
import { firestore } from 'firebase';
@Scalar('DateTime')
export class DateScalar {
    description = 'Date custom scalar type';

    parseValue(value) {
        const isNumber = typeof value === 'number';

        if (!isNumber) {
            console.log('value is not a number', value);
            if (value.seconds) {
                console.log('value.seconds === true', value.seconds);
                return new Date(value.seconds);
            }
        }
        console.log('value is a number', value);

        return new Date(value); // value from the client
    }

    serialize(value) {
        const isNumber = typeof value === 'number';

        if (!isNumber) {
            if (value.seconds !== undefined && value.nanoseconds !== undefined) {
                const date = new firestore.Timestamp(value.seconds, value.nanoseconds).toDate();
                return date;
            }
        }
        return value.getTime(); // value sent to the client
    }

    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return parseInt(ast.value, 10); // ast value is always in string format
        }
        return null;
    }
}
