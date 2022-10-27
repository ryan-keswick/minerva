# Logging service for the Minerva


class LoggingService:
    def __init__(self):
        pass

    def log(self, message: str) -> None:
        """Logs a message to the console

        Args:
            message (str): The message to log
        """
        print(message)

    def log_error(self, error: str) -> None:
        """Logs an error to the console

        Args:
            message (str): The error message to log
        """
        print(error)
